# BorderRadius

Defines immutable border radii for widgets.

## Usage Examples

```vue
<script setup>
import { BorderRadius, BoxDecoration, Container, Text } from "fluekit";

// 1. Circular radius for all corners
const circular = BorderRadius.circular(10); // Returns { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 }
const all = BorderRadius.all(10); // Alias for circular

// 2. Specific corners
const topRounded = BorderRadius.only({
  topLeft: 10,
  topRight: 10,
});

// 3. Zero radius
const zero = BorderRadius.zero;

const blueDecoration = BoxDecoration({ color: "blue", borderRadius: circular });
const redDecoration = BoxDecoration({ color: "red", borderRadius: topRounded });
const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Container :decoration="blueDecoration">
    <Text data="Circular Border" />
  </Container>

  <Container :decoration="redDecoration">
    <Text data="Top Rounded" />
  </Container>
</template>
```

## API

### Types

```typescript
export type BorderRadiusValue = number | string;

export interface BorderRadiusProps {
  // 'all' property is NOT supported. Use BorderRadius.all()
  topLeft?: BorderRadiusValue;
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}

export type BorderRadiusType = BorderRadiusProps;
export type BorderRadius = BorderRadiusProps;
```

### Methods

#### BorderRadius()

Factory function that acts as `.only()`.

```typescript
function BorderRadius(borderRadius: BorderRadiusProps): BorderRadiusProps;
```

#### BorderRadius.all()

Creates a uniform border radius for all corners.

```typescript
function all(value: BorderRadiusValue): BorderRadiusProps;
```

#### BorderRadius.circular()

Alias for `.all()`.

```typescript
function circular(value: BorderRadiusValue): BorderRadiusProps;
```

#### BorderRadius.only()

Creates border radii for specific corners.

```typescript
function only(borderRadius: {
  topLeft?: BorderRadiusValue;
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}): BorderRadiusProps;
```

#### BorderRadius.zero

Static property for zero border radius.

```typescript
const zero: BorderRadiusProps;
```

## Examples

### Circular Border

```vue
<Container
  :decoration="
    BoxDecoration({
      color: 'purple',
      borderRadius: BorderRadius.circular(20),
    })
  "
  :width="100"
  :height="100"
  alignment="center"
>
  <Text data="Circle" :style="whiteTextStyle" />
</Container>
```

### Top Rounded Only

```vue
<Container
  :decoration="
    BoxDecoration({
      color: 'green',
      borderRadius: BorderRadius.only({ topLeft: 15, topRight: 15 }),
    })
  "
  :width="100"
  :height="100"
  alignment="center"
>
  <Text data="Top Rounded" :style="whiteTextStyle" />
</Container>
```

### Mixed Border Radius

```vue
<Container
  :decoration="BoxDecoration({
    color: 'orange',
    borderRadius: BorderRadius.only({
      topLeft: 20,
      topRight: 5,
      bottomLeft: 5,
      bottomRight: 20,
    }),
  }"
  :width="100"
  :height="100"
  alignment="center"
>
  <Text data="Mixed" :style="whiteTextStyle" />
</Container>
```
