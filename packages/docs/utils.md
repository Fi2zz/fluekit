# Utils & API Reference

FlueKit provides a collection of utility functions and constants to help you build layouts more efficiently.

## Global Configuration

You can configure global settings using `FlueConfigProvider`.

### `assetBaseURL`

Sets the global base URL for `AssetImage`.

> **Note**: This configuration only affects `AssetImage`. If you use a raw string in `BoxDecoration` or other components, it will be treated as a raw CSS value (e.g., `url(...)` or gradient) without any path resolution.

```vue
<template>
  <FlueConfigProvider assetBaseURL="https://cdn.example.com/assets/">
    <App />
  </FlueConfigProvider>
</template>
```

### createAssetImageProvider

Creates a factory function for `AssetImage` with a preset package or base URL.

```typescript
import { createAssetImageProvider } from "fluekit";

const MyPackageAssets = createAssetImageProvider({ package: "my_package" });
const img = MyPackageAssets("logo.png");
// -> {base_url}/my_package/logo.png

// Or with a custom base URL
const SpecialAssets = createAssetImageProvider({ baseUrl: "https://special.com/" });
```

### createNetworkImageProvider

Creates a factory function for `NetworkImage` with a base URL.

```typescript
import { createNetworkImageProvider } from "fluekit";

const APIImages = createNetworkImageProvider("https://api.example.com/images/");
const img = APIImages("photo.jpg");
// -> NetworkImage("https://api.example.com/images/photo.jpg")
```
