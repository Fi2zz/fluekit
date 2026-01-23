# StyleProvider

A component that provides CSS styles to its descendants. It uses Vue's `provide`/`inject` mechanism to pass styles down the component tree. FlueKit components like `Text` and `Container` automatically consume these styles.

## Usage

```vue
<script setup>
import { StyleProvider, Text } from "fluekit";
</script>

<template>
  <StyleProvider :style="{ color: 'blue', fontSize: '20px' }">
    <Text>This text is blue and 20px</Text>
  </StyleProvider>
</template>
```

## Examples

### Basic Demo

<script setup>
import BasicDemo from '../demos/style-provider/BasicDemo.vue';
</script>

<BasicDemo />

## Props

| Prop    | Type            | Default | Description                           |
| ------- | --------------- | ------- | ------------------------------------- |
| `style` | `CSSProperties` | `{}`    | The styles to provide to descendants. |

## Details

- **Merging**: Nested `StyleProvider`s merge their styles with parent providers.
- **Consumption**: Components need to use the `useStyles()` composable (internal) to access these styles. Most FlueKit layout and text components support this out of the box.
