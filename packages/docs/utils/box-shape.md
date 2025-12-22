# BoxShape

Defines the shape of a box, commonly used in `BoxDecoration`.

## Usage Examples

```vue
<script setup>
import {
  BoxShape,
  Container,
  EdgeInsets,
  Border,
  BorderRadius,
  BoxDecoration,
  TextStyle,
  Text,
} from "fluekit";

const circleDecoration = BoxDecoration({
  color: "red",
  shape: BoxShape.circle,
});

const rectangleDecoration = BoxDecoration({
  color: "blue",
  shape: BoxShape.rectangle,
});

const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Container :padding="EdgeInsets.all(10)">
    <Row :gap="20">
      <Container :width="100" :height="100" :decoration="circleDecoration" alignment="center">
        <Text data="Circle" :style="whiteTextStyle" />
      </Container>

      <Container :width="100" :height="100" :decoration="rectangleDecoration" alignment="center">
        <Text data="Rectangle" :style="whiteTextStyle" />
      </Container>
    </Row>
  </Container>
</template>
```

## API

### Types

```typescript
export enum BoxShape {
  rectangle = "rectangle",
  circle = "circle",
}
```

### Available Values

- `rectangle` - A rectangular shape (default).
- `circle` - A circular shape.

## Examples

### Circle with Border

```vue
<Container
  :width="120"
  :height="120"
  :decoration="
    BoxDecoration({
      color: 'purple',
      shape: BoxShape.circle,
      border: Border.all({ color: 'white', width: 4 }),
    })
  "
  alignment="center"
>
  <Text data="Circle with Border" :style="whiteTextStyle" />
</Container>
```

### Rectangle with BorderRadius

```vue
<Container
  :width="120"
  :height="80"
  :decoration="
    BoxDecoration({
      color: 'green',
      shape: BoxShape.rectangle,
      borderRadius: BorderRadius.all(16),
    })
  "
  alignment="center"
>
  <Text data="Rounded Rectangle" :style="whiteTextStyle" />
</Container>
```
