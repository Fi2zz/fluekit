# Icon

A graphical icon widget drawn with a glyph from a font described in an IconData, or an SVG path/component.

## Usage

<script setup>
import IconDemo from '@example/demos/new_components/IconDemo.vue'
</script>

<div class="demo-box">
  <IconDemo />
</div>

<<< ../demos/new_components/IconDemo.vue

## Pre-defined Icons

FlueKit provides sets of pre-defined icons that can be used directly. These are available via the `Icons` (Material Design) and `CupertinoIcons` (iOS style) exports.

```vue
<script setup>
import { Icon, Icons, CupertinoIcons } from "fluekit";
</script>

<template>
  <!-- Material Icons -->
  <Icon :icon="Icons.search" color="blue" />
  <Icon :icon="Icons.check" color="green" />

  <!-- Cupertino Icons -->
  <Icon :icon="CupertinoIcons.search" color="blue" />
  <Icon :icon="CupertinoIcons.check" color="green" />
</template>
```

## API

### Props

| Name            | Type                  | Default   | Description                                                                                                                                                         |
| :-------------- | :-------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `icon`          | `string \| Component` | -         | The icon to display. Can be: <br> - A Vue Component (e.g. imported from .svg file) <br> - A string containing SVG path data (d attribute)                           |
| `size`          | `number \| string`    | `24`      | The size of the icon in logical pixels.                                                                                                                             |
| `color`         | `string`              | `inherit` | The color to use when drawing the icon. If not specified, it defaults to the current text color. <br> This color applies to both `fill` and `color` CSS properties. |
| `semanticLabel` | `string`              | -         | Semantic label for accessibility.                                                                                                                                   |

### Slots

| Name      | Description                                                                                             |
| :-------- | :------------------------------------------------------------------------------------------------------ |
| `default` | Custom content (usually an `<svg>` element) to render inside the Icon container. Overrides `icon` prop. |
