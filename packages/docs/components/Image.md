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
  - Can be configured globally via `setAssetBaseURL`.

### Asset Management

FlueKit provides helpers to manage asset paths, useful for deploying to CDNs or handling multi-package structures.

#### `setAssetBaseURL(url: string)`

Sets the global base URL for all `AssetImage` calls.

```typescript
import { setAssetBaseURL, AssetImage } from "fluekit";

// Set global base path (e.g. in main.ts)
setAssetBaseURL("https://cdn.example.com/assets/");

// Usage
AssetImage("logo.png");
// -> https://cdn.example.com/assets/logo.png

AssetImage("icon.png", { package: "common" });
// -> https://cdn.example.com/assets/common/icon.png
```

#### `createAssetImage(options: { package: string })`

Creates a factory function for a specific package, reducing boilerplate.

```typescript
import { createAssetImage } from "fluekit";

// Create a helper for a specific module/package
const CommonAssets = createAssetImage({ package: "common" });

// Usage
const icon = CommonAssets("icons/user.png");
// -> {base_url}/common/icons/user.png
```
