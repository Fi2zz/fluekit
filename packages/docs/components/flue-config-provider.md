# FlueConfigProvider

A provider component to configure global settings for FlueKit.

## Usage

Wrap your application or a part of it with `FlueConfigProvider` to set global configurations.

```vue
<template>
  <FlueConfigProvider :transform="true" :designWidth="750" assetBaseURL="https://cdn.example.com/">
    <App />
  </FlueConfigProvider>
</template>
```

## Props

| Prop           | Type      | Default | Description                                          |
| -------------- | --------- | ------- | ---------------------------------------------------- |
| `transform`    | `boolean` | `true`  | Whether to enable automatic px-to-vw transformation. |
| `designWidth`  | `number`  | `750`   | The design width in pixels for px-to-vw calculation. |
| `assetBaseURL` | `string`  | `/`     | The base URL for `AssetImage`.                       |

## Notes

- **transform**: If set to `true` (default), FlueKit will automatically convert pixel values to `vw` units based on the `designWidth`. This is useful for responsive mobile layouts.
- **designWidth**: Sets the reference width for the px-to-vw conversion. For example, if your design is 750px wide, 750px in code will equal 100vw.
- **assetBaseURL**: Sets the base path for assets loaded via `AssetImage`. This is useful when hosting assets on a CDN or a specific subdirectory.
