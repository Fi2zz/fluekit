# ImageUtils

A collection of utility functions for image processing.

## Methods

### extractDominantColor

Extracts the dominant color from an image URL.

```ts
import { ImageUtils } from "fluekit";

const color = await ImageUtils.extractDominantColor("https://example.com/image.jpg");

if (color) {
  console.log(color.toString()); // rgba(r, g, b, 1)
}
```

**Parameters:**

- `imageSrc` (`string`): The URL of the image to analyze. The image must support CORS (Cross-Origin Resource Sharing) if it's from a different domain.

**Returns:**

- `Promise<Color | null>`: A Promise that resolves to a `Color` object representing the dominant color, or `null` if extraction fails (e.g., due to CORS error or load failure).

## Performance Note

This utility uses a shared `OffscreenCanvas` (if available) or `HTMLCanvasElement` to process images efficiently without creating new DOM elements for each request. It also scales down large images before processing to ensure fast performance.
