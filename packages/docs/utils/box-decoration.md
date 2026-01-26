# BoxDecoration

Defines the decoration of a box, including color, border, border radius, box shadow, gradient, and image.

## Usage Examples

```vue
<script setup>
import {
  BoxDecoration,
  Border,
  BorderRadius,
  BoxShadow,
  BoxShape,
  LinearGradient,
  Alignment,
} from "fluekit";

// 1. Box with Shadow
const shadowDecoration = BoxDecoration({
  color: "white",
  boxShadow: [
    BoxShadow({
      color: "rgba(0,0,0,0.2)",
      offset: { x: 0, y: 4 },
      blurRadius: 8,
      spreadRadius: 2,
    }),
  ],
});

// 2. Circle Shape with Border
const circleDecoration = BoxDecoration({
  color: "red",
  shape: BoxShape.circle,
  border: Border.all({ width: 2, color: "white" }),
});

// 3. Linear Gradient
const gradientDecoration = BoxDecoration({
  gradient: LinearGradient({
    colors: ["red", "blue"],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  }),
  borderRadius: BorderRadius.circular(4),
});
</script>

<template>
  <Container :decoration="shadowDecoration" :width="100" :height="100">
    <Text data="Shadow Box" />
  </Container>

  <Container :decoration="circleDecoration" :width="100" :height="100">
    <Text data="Circle" />
  </Container>
</template>
```

## API

### Types

```typescript
export type BoxFit = "fitWidth" | "fitHeight" | "fill" | "contain" | "cover" | "none" | "scaleDown";
export type ImageRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
export type ImageProvider = string;
export type Overflow = "none" | "visible" | "hidden" | "scroll" | "auto";

export interface DecorationImageProps {
  image: ImageProvider;
  fit?: BoxFit;
  alignment?: Alignment;
  repeat?: ImageRepeat;
  blendMode?: string;
  attachment?: string;
  clip?: string;
  origin?: string;
}

export interface BoxDecorationProps {
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow | BoxShadow[];
  gradient?: string;
  image?: DecorationImageProps;
  overflow?: Overflow;
  opacity?: number | string;
  shape?: BoxShape;
  backdropFilter?: ImageFilter | string;
}

export type BoxDecoration = BoxDecorationProps;
```

### Methods

#### BoxDecoration()

Factory function for creating BoxDecoration objects.

```typescript
function BoxDecoration(props?: BoxDecorationProps): BoxDecorationProps;
```

### Constants

#### BoxFit

Defines how a box should be inscribed into another box (e.g., for images).

```typescript
export const BoxFit = {
  fitWidth: "fitWidth",
  fitHeight: "fitHeight",
  fill: "fill",
  contain: "contain",
  cover: "cover",
  none: "none",
  scaleDown: "scaleDown",
} as const;
```

#### BoxShape

Defines the shape of a box.

```typescript
export enum BoxShape {
  rectangle = "rectangle",
  circle = "circle",
}
```

#### Clip

Defines how to clip the content of a component.

```typescript
export const Clip = {
  none: "none",
  hardEdge: "hardEdge",
  antiAlias: "antiAlias",
  antiAliasWithSaveLayer: "antiAliasWithSaveLayer",
} as const;
```

#### NetworkImage & AssetImage

Helpers for creating image providers.

```typescript
export const NetworkImage = (url: string) => url;
export const AssetImage = (url: string) => url;
```

## Examples

### Basic Decoration

```vue
<Container
  :decoration="
    BoxDecoration({
      color: 'lightblue',
      borderRadius: BorderRadius.circular(8),
    })
  "
  :padding="EdgeInsets.all(16)"
>
  <Text data="Basic Decoration" />
</Container>
```

### Decoration with Border

```vue
<Container
  :decoration="
    BoxDecoration({
      color: 'white',
      border: Border.all({ width: 2, color: 'gray' }),
      borderRadius: BorderRadius.circular(4),
    })
  "
  :padding="EdgeInsets.all(16)"
>
  <Text data="Border Decoration" />
</Container>
```

### Decoration with Gradient

```vue
<Container
  :decoration="
    BoxDecoration({
      gradient: 'linear-gradient(to right, #ff6b6b, #4ecdc4)',
      borderRadius: BorderRadius.circular(8),
    })
  "
  :padding="EdgeInsets.all(16)"
>
  <Text data="Gradient Decoration" :style="TextStyle({ color: 'white' })" />
</Container>
```

### Decoration with Image

```vue
<Container
  :decoration="
    BoxDecoration({
      image: {
        image: NetworkImage('https://picsum.photos/200/300'),
        fit: BoxFit.cover,
      },
      borderRadius: BorderRadius.circular(8),
    })
  "
  :width="200"
  :height="150"
  alignment="center"
>
  <Text data="Image Decoration" :style="TextStyle({ color: 'white', textShadow: '0 0 5px black' })" />
</Container>
```

### Circle Decoration

```vue
<Container
  :decoration="
    BoxDecoration({
      color: '#ff6b6b',
      shape: BoxShape.circle,
      boxShadow: [
        BoxShadow({
          color: 'rgba(0,0,0,0.2)',
          blurRadius: 10,
        }),
      ],
    })
  "
  :width="100"
  :height="100"
  alignment="center"
>
  <Text data="Circle" :style="TextStyle({ color: 'white' })" />
</Container>
```

### Backdrop Filter (Glassmorphism)

You can use `backdropFilter` property to create glassmorphism effects.

<script setup>
import BackdropFilterDemo from '../demos/box-decoration/BackdropFilterDemo.vue';
</script>

<div class="demo-container">
  <BackdropFilterDemo />
</div>

```vue
<template>
  <Stack
    :width="300"
    :height="200"
    :decoration="
      BoxDecoration({
        image: {
          image: 'https://picsum.photos/300/200',
          fit: 'cover',
        },
        borderRadius: BorderRadius.circular(12),
      })
    "
  >
    <Positioned :top="20" :left="20" :right="20">
      <Container
        :height="80"
        alignment="center"
        :decoration="
          BoxDecoration({
            color: 'rgba(255, 255, 255, 0.2)',
            borderRadius: BorderRadius.circular(16),
            border: Border.all({ color: 'rgba(255, 255, 255, 0.3)', width: 1 }),
            backdropFilter: ImageFilter.blur({ sigmaX: 10, sigmaY: 10 }),
          })
        "
      >
        <Text
          data="Glassmorphism"
          :style="TextStyle({ color: 'white', fontSize: 20, fontWeight: 'bold' })"
        />
      </Container>
    </Positioned>
  </Stack>
</template>
```
