# Gradients

Helper functions to create CSS gradients.

## Usage Examples

```vue
<script setup>
import {
  LinearGradient,
  RadialGradient,
  Container,
  BorderRadius,
  EdgeInsets,
  BoxDecoration,
  TextStyle,
  Text,
} from "fluekit";

// Linear Gradient
const linearGradient = LinearGradient({
  colors: ["red", "blue"],
  begin: "topLeft",
  end: "bottomRight",
});

// Radial Gradient
const radialGradient = RadialGradient({
  colors: ["yellow", "purple"],
  center: "center",
  radius: 0.5,
});

const linearDecoration = BoxDecoration({
  gradient: linearGradient,
  borderRadius: BorderRadius.all(8),
});

const radialDecoration = BoxDecoration({
  gradient: radialGradient,
  borderRadius: BorderRadius.all(8),
});

const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Container :width="100" :height="100" :decoration="linearDecoration" alignment="center">
    <Text data="Linear Gradient" :style="whiteTextStyle" />
  </Container>

  <Container
    :width="100"
    :height="100"
    :margin="EdgeInsets.only({ top: 20 })"
    :decoration="radialDecoration"
    alignment="center"
  >
    <Text data="Radial Gradient" :style="whiteTextStyle" />
  </Container>
</template>
```

## API

### Types

```typescript
export enum TileMode {
  clamp = "clamp",
  repeated = "repeat",
  mirrored = "mirror",
  decal = "decal",
}

export interface GradientProps {
  colors: string[];
  stops?: number[];
}

export interface LinearGradientProps extends GradientProps {
  begin?: Alignment;
  end?: Alignment;
  tileMode?: TileMode;
}

export interface RadialGradientProps extends GradientProps {
  center?: Alignment;
  radius?: number;
  focal?: Alignment;
  focalRadius?: number;
  tileMode?: TileMode;
}
```

### Methods

#### LinearGradient()

Creates a linear gradient CSS string.

```typescript
function LinearGradient(props: LinearGradientProps): string;
```

#### RadialGradient()

Creates a radial gradient CSS string.

```typescript
function RadialGradient(props: RadialGradientProps): string;
```

## Examples

### Linear Gradient with Stops

```vue
<Container
  :decoration="
    BoxDecoration({
      gradient: LinearGradient({
        colors: ['red', 'yellow', 'green'],
        stops: [0, 0.5, 1],
        begin: 'left',
        end: 'right',
      }),
    })
  "
  :padding="EdgeInsets.all(16)"
  alignment="center"
>
  <Text data="Linear Gradient with Stops" :style="whiteTextStyle" />
</Container>
```

### Radial Gradient with Custom Center

```vue
<Container
  :decoration="
    BoxDecoration({
      gradient: RadialGradient({
        colors: ['blue', 'transparent'],
        center: 'topLeft',
        radius: 1,
      }),
    })
  "
  :padding="EdgeInsets.all(16)"
  :margin="EdgeInsets.only({ top: 10 })"
  alignment="center"
>
  <Text data="Radial Gradient" />
</Container>
```
