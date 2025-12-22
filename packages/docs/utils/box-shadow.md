# BoxShadow

Defines a box shadow for widgets.

## Usage Examples

```vue
<script setup>
import { BoxShadow, Container, BorderRadius, EdgeInsets, BoxDecoration, Text } from "fluekit";

const shadow = BoxShadow({
  color: "rgba(0,0,0,0.2)",
  offset: { x: 0, y: 4 },
  blurRadius: 8,
  spreadRadius: 2,
});

const shadowDecoration = BoxDecoration({
  color: "white",
  boxShadow: [shadow],
  borderRadius: BorderRadius.all(8),
});
</script>

<template>
  <Container :width="100" :height="100" :decoration="shadowDecoration" alignment="center">
    <Text data="Box with Shadow" />
  </Container>
</template>
```

## API

### Types

```typescript
export interface Offset {
  x: number;
  y: number;
}

export enum BlurStyle {
  normal = "normal",
  solid = "solid",
  outer = "outer",
  inner = "inner",
}

export interface BoxShadowProps {
  color?: string;
  offset?: Offset;
  blurRadius?: number;
  spreadRadius?: number;
  blurStyle?: BlurStyle;
}

export type BoxShadow = BoxShadowProps;
```

### Methods

#### BoxShadow()

Factory function for creating BoxShadow objects.

```typescript
function BoxShadow(props: BoxShadowProps = {}): BoxShadowProps;
```

## Examples

### Basic Shadow

```vue
<Container
  :decoration="
    BoxDecoration({
      boxShadow: [
        BoxShadow({
          color: 'rgba(0,0,0,0.1)',
          offset: { x: 2, y: 2 },
          blurRadius: 4,
        }),
      ],
    })
  "
  :padding="EdgeInsets.all(16)"
>
  <Text data="Basic Shadow" />
</Container>
```

### Multiple Shadows

```vue
<Container
  :decoration="
    BoxDecoration({
      boxShadow: [
        BoxShadow({
          color: 'rgba(255,0,0,0.3)',
          offset: { x: -2, y: -2 },
          blurRadius: 4,
        }),
        BoxShadow({
          color: 'rgba(0,0,255,0.3)',
          offset: { x: 2, y: 2 },
          blurRadius: 4,
        }),
      ],
    })
  "
  :padding="EdgeInsets.all(16)"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Multiple Shadows" />
</Container>
```

### Inner Shadow

```vue
<Container
  :decoration="
    BoxDecoration({
      boxShadow: [
        BoxShadow({
          color: 'rgba(0,0,0,0.2)',
          blurRadius: 8,
          blurStyle: BlurStyle.inner,
        }),
      ],
    })
  "
  :padding="EdgeInsets.all(16)"
  :margin="EdgeInsets.only({ top: 10 })"
>
  <Text data="Inner Shadow" />
</Container>
```
