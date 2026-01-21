# Image

A widget that displays an image.

## Basic Usage

Use `NetworkImage` or `AssetImage` to specify the image source.

<script setup>
import BasicImage from '@example/demos/image/BasicImage.vue'
import FitImage from '@example/demos/image/FitImage.vue'
</script>

<div class="demo-box">
  <BasicImage />
</div>

<<< ../demos/image/BasicImage.vue

## Image Fit

The `fit` property controls how the image should be inscribed into the box.

<div class="demo-box">
  <FitImage />
</div>

<<< ../demos/image/FitImage.vue

## API

### Props

| Name            | Type               | Default     | Description                                                       |
| :-------------- | :----------------- | :---------- | :---------------------------------------------------------------- |
| `image`         | `ImageProvider`    | -           | The image provider (e.g., `NetworkImage('url')`).                 |
| `width`         | `number \| string` | -           | The width of the image.                                           |
| `height`        | `number \| string` | -           | The height of the image.                                          |
| `fit`           | `BoxFit`           | `'contain'` | How to inscribe the image into the space allocated during layout. |
| `alignment`     | `Alignment`        | `'center'`  | How to align the image within its bounds.                         |
| `opacity`       | `number`           | `1.0`       | The opacity of the image.                                         |
| `filterQuality` | `FilterQuality`    | `'medium'`  | The rendering quality of the image.                               |
| `alt`           | `string`           | `''`        | Semantic description of the image.                                |

### Events

| Name    | Description                                      | Parameters |
| :------ | :----------------------------------------------- | :--------- |
| `load`  | Triggered when the image is successfully loaded. | `Event`    |
| `error` | Triggered when the image fails to load.          | `Event`    |

### ImageProvider

Functions to create image providers:

- **`NetworkImage(url, options?)`**: Creates an object that fetches the image at the given URL.
- **`AssetImage(name, options?)`**: Creates an object that fetches an image from an asset bundle.
  - If `options.package` is provided, the path becomes `${package}/${name}`.
  - If `options.baseUrl` is provided, it overrides the global configuration.
  - Can be configured globally via `FlueConfigProvider`.

### Asset Management

FlueKit provides helpers to manage asset paths, useful for deploying to CDNs or handling multi-package structures.

#### Global Configuration

You can configure the global base URL for all `AssetImage` calls using `FlueConfigProvider`.

```vue
<template>
  <FlueConfigProvider assetBaseURL="https://cdn.example.com/assets/">
    <App />
  </FlueConfigProvider>
</template>
```

#### Local Override

You can override the global configuration for specific images using `options.baseUrl`.

```typescript
AssetImage("logo.png", { baseUrl: "https://special-cdn.com/" });
```

#### `createAssetImageProvider(options: { package: string })`

Creates a factory function for a specific package, reducing boilerplate.

```typescript
import { createAssetImageProvider } from "fluekit";

// Create a helper for a specific module/package
const CommonAssets = createAssetImageProvider({ package: "common" });

// Usage
const icon = CommonAssets("icons/user.png");
// -> {base_url}/common/icons/user.png
```

#### `createNetworkImageProvider(baseUrl: string)`

Creates a factory function for remote images with a fixed base URL.

```typescript
import { createNetworkImageProvider } from "fluekit";

const APIImages = createNetworkImageProvider("https://api.example.com/images/");

// Usage
const avatar = APIImages("users/123/avatar.png");
// -> NetworkImage("https://api.example.com/images/users/123/avatar.png")
```
