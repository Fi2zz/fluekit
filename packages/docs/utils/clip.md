# Clip

Defines how to clip the content of a component (e.g. `Container`).

## Usage Examples

```vue
<script setup>
import { Clip, Container, EdgeInsets, BorderRadius, BoxDecoration, TextStyle, Text } from "fluekit";

const blueDecoration = BoxDecoration({ color: "blue" });
const redDecoration = BoxDecoration({
  color: "red",
  borderRadius: BorderRadius.all(20),
});
const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Container :padding="EdgeInsets.all(10)">
    <Row :gap="20">
      <Container
        :width="100"
        :height="100"
        :decoration="blueDecoration"
        clipBehavior="antiAlias"
        alignment="center"
      >
        <Text data="Anti Alias" :style="whiteTextStyle" />
      </Container>
    </Row>
  </Container>
</template>
```

## API

### Types

```typescript
export type Clip = keyof typeof Clip;
```

### Constants

```typescript
export const Clip = {
  none: "none",
  hardEdge: "hardEdge",
  antiAlias: "antiAlias",
  antiAliasWithSaveLayer: "antiAliasWithSaveLayer",
} as const;
```

### Available Values

- `none` - No clipping (default).
- `hardEdge` - Clip, but do not apply anti-aliasing (fastest).
- `antiAlias` - Clip with anti-aliasing.
- `antiAliasWithSaveLayer` - Clip with anti-aliasing and save layer (slower).

## Examples

### Clip with BorderRadius

```vue
<Container
  :width="100"
  :height="100"
  :decoration="redDecoration"
  clipBehavior="antiAlias"
  alignment="center"
>
  <Text data="Clipped" :style="whiteTextStyle" />
</Container>
```
