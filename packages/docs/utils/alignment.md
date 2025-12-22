# Alignment

Defines alignment geometry, commonly used in `Container`, `Align`, `Stack`, and other components.

## Usage Examples

```vue
<script setup>
import { Alignment, Container, Text, BoxDecoration, TextStyle } from "fluekit";

const blueDecoration = BoxDecoration({ color: "blue" });
const greenDecoration = BoxDecoration({ color: "green" });
const whiteTextStyle = TextStyle({ color: "white" });
const smallWhiteTextStyle = TextStyle({ color: "white", fontSize: "12px" });
</script>

<template>
  <Container :width="100" :height="100" :decoration="blueDecoration" alignment="center">
    <Text data="Center" :style="whiteTextStyle" />
  </Container>

  <Container
    :width="100"
    :height="100"
    :margin="EdgeInsets.only({ top: 20 })"
    :decoration="greenDecoration"
    alignment="bottomRight"
  >
    <Text data="Bottom Right" :style="smallWhiteTextStyle" />
  </Container>
</template>
```

## API

### Types

```typescript
export type Alignment = keyof typeof Alignment | string;
```

### Constants

```typescript
export const Alignment = {
  topLeft: "topLeft",
  topCenter: "topCenter",
  topRight: "topRight",
  centerLeft: "centerLeft",
  center: "center",
  centerRight: "centerRight",
  bottomLeft: "bottomLeft",
  bottomCenter: "bottomCenter",
  bottomRight: "bottomRight",
} as const;
```

### Available Values

- `topLeft` - Align to the top-left corner
- `topCenter` - Align to the top-center
- `topRight` - Align to the top-right corner
- `centerLeft` - Align to the center-left
- `center` - Align to the center
- `centerRight` - Align to the center-right
- `bottomLeft` - Align to the bottom-left corner
- `bottomCenter` - Align to the bottom-center
- `bottomRight` - Align to the bottom-right corner

## Examples

### Container Alignment

```vue
<script setup>
const lightGrayDecoration = BoxDecoration({ color: "lightgray" });
</script>

<Container :width="200" :height="100" :decoration="lightGrayDecoration" alignment="topLeft">
  <Text data="Top Left" />
</Container>

<Container
  :width="200"
  :height="100"
  :decoration="lightGrayDecoration"
  alignment="center"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Center" />
</Container>

<Container
  :width="200"
  :height="100"
  :decoration="lightGrayDecoration"
  alignment="bottomRight"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Bottom Right" />
</Container>
```

### Align Component

```vue
<Container :width="200" :height="100" :decoration="lightGrayDecoration">
  <Align alignment="bottomLeft">
    <Container :width="50" :height="50" :decoration="BoxDecoration({ color: 'red' })" />
  </Align>
</Container>
```

### Stack Alignment

```vue
<Stack :width="200" :height="200" :decoration="lightGrayDecoration" alignment="center">
  <Container :width="150" :height="150" :decoration="BoxDecoration({ color: 'blue', opacity: 0.3 })" />
  <Container :width="100" :height="100" :decoration="BoxDecoration({ color: 'green', opacity: 0.5 })" />
  <Container :width="50" :height="50" :decoration="BoxDecoration({ color: 'red' })" />
</Stack>
```
