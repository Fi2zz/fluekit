# Border

Defines a border side for widgets.

## Usage Examples

```vue
<script setup>
import { Border, Container, BorderRadius, EdgeInsets, BoxDecoration, Text } from "fluekit";

// 1. Uniform border (Flutter style)
// Returns { top: side, bottom: side, left: side, right: side }
const allBorder = Border.all({ color: "black", width: 1 });

// 2. Single side definition (Helper for creating a Side)
const side = Border({ width: 2, color: "red" });

const uniformBorderDecoration = BoxDecoration({ border: allBorder });
const mixedBorderDecoration = BoxDecoration({
  border: {
    bottom: side,
    top: Border({ style: "dashed", width: 1 }),
  },
});
</script>

<template>
  <!-- Uniform border using helper -->
  <Container :width="100" :height="100" :decoration="uniformBorderDecoration" alignment="center">
    <Text data="Uniform Border" />
  </Container>

  <!-- Manual composition -->
  <Container
    :width="100"
    :height="100"
    :margin="EdgeInsets.only({ top: 20 })"
    :decoration="mixedBorderDecoration"
    alignment="center"
  >
    <Text data="Mixed Border" />
  </Container>
</template>
```

## API

### Types

```typescript
export type BorderStyleType = "none" | "solid" | "dashed" | "dotted" | "double";

export interface BorderSide {
  width?: number;
  color?: string;
  style?: BorderStyleType;
}

export interface Borders {
  // 'all' property is NOT supported. Use Border.all()
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}
```

### Methods

#### Border()

Factory function for creating a BorderSide.

```typescript
function Border(side: BorderSide): BorderSide;
```

#### Border.all()

Creates a uniform border for all sides.

```typescript
function all(side: BorderSide): Borders;
```

## Examples

### Solid Border

```vue
<Container
  :decoration="
    BoxDecoration({
      border: Border.all({ color: 'blue', width: 2 }),
      borderRadius: BorderRadius.all(4),
    })
  "
  :padding="EdgeInsets.all(16)"
>
  <Text data="Solid Border" />
</Container>
```

### Dashed Border

```vue
<Container
  :decoration="
    BoxDecoration({
      border: Border.all({ color: 'red', width: 1, style: 'dashed' }),
    })
  "
  :padding="EdgeInsets.all(16)"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Dashed Border" />
</Container>
```

### Bottom Border Only

```vue
<Container
  :decoration="
    BoxDecoration({
      border: {
        bottom: Border({ color: 'green', width: 3 }),
      },
    })
  "
  :padding="EdgeInsets.all(16)"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Bottom Border Only" />
</Container>
```
