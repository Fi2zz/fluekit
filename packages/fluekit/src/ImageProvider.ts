const IMAGE_PROVIDER_SYMBOL = Symbol("ImageProvider");

export interface ImageProvider {
  src: string;
  [IMAGE_PROVIDER_SYMBOL]: true;
}

export function isImageProvider(value: any): value is ImageProvider {
  return value && value[IMAGE_PROVIDER_SYMBOL] === true;
}

export function NetworkImage(url: string): ImageProvider {
  return {
    src: url,
    [IMAGE_PROVIDER_SYMBOL]: true,
  };
}

/**
 * Creates an ImageProvider from a Base64 string or Blob.
 *
 * @param data Base64 string (data:image/...) or Blob object
 */
export function MemoryImage(data: string | Blob): ImageProvider {
  let src = "";
  if (typeof data === "string") {
    src = data;
  } else if (data instanceof Blob) {
    src = URL.createObjectURL(data);
  } else {
    console.warn("[MemoryImage] Unsupported data type. Expected string (base64) or Blob.");
  }

  return {
    src,
    [IMAGE_PROVIDER_SYMBOL]: true,
  };
}

export interface AssetImageOptions {
  package?: string;
  bundle?: any;
  /**
   * Overrides the global asset base URL for this image.
   */
  baseUrl?: string;
}

let _assetBaseUrl = "/";

/**
 * 设置 AssetImage 的基础路径
 * @internal 此函数主要用于 FlueConfigProvider 内部调用。
 * @param url 基础路径，例如 'https://cdn.example.com/assets/' 或 '/static/'
 */
export function setAssetBaseURL(url: string) {
  _assetBaseUrl = url;
}

/**
 * 加载本地资源图片
 * 注意：在 Vite 环境下，通常需要使用 new URL('./path', import.meta.url).href 或 import 导入图片
 * 这里 AssetImage 接收的 name 应该是处理后的 URL 或者是相对于 public 的路径
 */
export function AssetImage(name: string, options: AssetImageOptions = {}): ImageProvider {
  /**
   * 移除 Flutter 特有的 packages/ 前缀，直接拼接 package 名
   * 这样更符合 Web 的扁平化或自定义目录结构
   */
  let path = options.package ? `${options.package}/${name}` : name;

  // 如果是绝对路径或特殊协议（data:, blob:, http:, https:），直接返回，不拼接 base
  if (/^(https?:|file:|blob:|data:|\/\/)/i.test(path)) {
    return {
      src: path,
      [IMAGE_PROVIDER_SYMBOL]: true,
    };
  }

  // 优先使用 options.baseUrl，否则使用全局 _assetBaseUrl
  const baseUrl = options.baseUrl ?? _assetBaseUrl;

  if (baseUrl) {
    const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    path = base + cleanPath;
  }

  return {
    src: path,
    [IMAGE_PROVIDER_SYMBOL]: true,
  };
}

/**
 * 创建一个预设 package 的 AssetImage 工厂函数
 *
 * @example
 * const MyPkgAssets = createAssetImageProvider({ package: 'my_pkg' });
 * const img = MyPkgAssets('icons/logo.png'); // 相当于 AssetImage('icons/logo.png', { package: 'my_pkg' })
 */
export function createAssetImageProvider(
  baseOptions: AssetImageOptions,
): (name: string, options?: AssetImageOptions) => ImageProvider {
  return (name: string, options: AssetImageOptions = {}) => {
    return AssetImage(name, { ...baseOptions, ...options });
  };
}

/**
 * Creates a factory function for NetworkImage with a base URL.
 *
 * @example
 * const MyRemoteImages = createNetworkImageProvider("https://api.example.com/images/");
 * const img = MyRemoteImages("user/avatar.png"); // -> NetworkImage("https://api.example.com/images/user/avatar.png")
 */
export function createNetworkImageProvider(baseUrl: string): (url: string) => ImageProvider {
  return (url: string) => {
    if (/^(https?:|file:|blob:|data:|\/\/)/i.test(url)) {
      return NetworkImage(url);
    }
    const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    return NetworkImage(base + cleanUrl);
  };
}

export function ImageProvider(url: string) {
  if (!url || typeof url != "string")
    return { src: null, [IMAGE_PROVIDER_SYMBOL]: true } as unknown as ImageProvider;
  if (url.startsWith("http")) return NetworkImage(url);
  if (url.startsWith("data:")) return MemoryImage(url);
  return AssetImage(url);
}
