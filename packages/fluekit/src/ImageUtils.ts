import { Color } from "./Color";

// Singleton canvas instance (lazy initialized)
let sharedCanvas: HTMLCanvasElement | OffscreenCanvas | null = null;
let sharedCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

const getCanvasContext = () => {
  if (sharedCtx) return sharedCtx;

  if (typeof OffscreenCanvas !== "undefined") {
    sharedCanvas = new OffscreenCanvas(1, 1); // Size will be updated
    sharedCtx = sharedCanvas.getContext("2d", {
      willReadFrequently: true,
    }) as OffscreenCanvasRenderingContext2D;
  } else {
    sharedCanvas = document.createElement("canvas");
    sharedCtx = sharedCanvas.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
  }
  return sharedCtx;
};

/**
 * Extracts the dominant color from an image URL.
 *
 * @param imageSrc The URL of the image.
 * @returns A Promise that resolves to the dominant Color, or null if extraction fails.
 */
export async function extractDominantColor(imageSrc: string): Promise<Color | null> {
  if (typeof window === "undefined" || typeof Image === "undefined") {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      try {
        const ctx = getCanvasContext();
        if (!ctx || !sharedCanvas) {
          resolve(null);
          return;
        }

        // Scale down image for faster processing
        const maxSize = 100;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        const width = Math.floor(img.width * scale) || 1;
        const height = Math.floor(img.height * scale) || 1;

        // Resize canvas
        sharedCanvas.width = width;
        sharedCanvas.height = height;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const colorCounts: Record<string, number> = {};
        let maxCount = 0;
        let dominantHex = "#000000";

        // Quantization factor (higher = less colors, more grouping)
        const quantization = 5;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip transparent or semi-transparent pixels
          //@ts-expect-error
          if (a < 128) continue;

          // Simple quantization
          //@ts-expect-error
          const qr = Math.round(r / quantization) * quantization;
          //@ts-expect-error
          const qg = Math.round(g / quantization) * quantization;
          //@ts-expect-error
          const qb = Math.round(b / quantization) * quantization;
          const key = `${qr},${qg},${qb}`;
          colorCounts[key] = (colorCounts[key] || 0) + 1;
          if (colorCounts[key] > maxCount) {
            maxCount = colorCounts[key];
            dominantHex = `rgb(${qr},${qg},${qb})`;
          }
        }

        resolve(Color.fromString(dominantHex));
      } catch (e) {
        console.warn("[ImageUtils] Failed to extract color:", e);
        resolve(null);
      }
    };

    img.onerror = () => {
      console.warn("[ImageUtils] Failed to load image:", imageSrc);
      resolve(null);
    };
  });
}

export const ImageUtils = {
  extractDominantColor,
};
