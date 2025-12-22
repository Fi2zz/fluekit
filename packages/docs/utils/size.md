# Size

Defines a size with width and height, similar to Flutter's `Size` class. It's primarily used for internal calculations and API consistency, rather than as a direct widget property.

## Usage Examples

```vue
<script setup>
import { Size, Container, SizedBox } from "fluekit";

// 1. Flutter-style helpers
const zero = Size.zero;
const infinite = Size.infinite;
const fixedHeight = Size.fromHeight(200); // width: Infinity
const fixedWidth = Size.fromWidth(100); // height: Infinity
const square = Size.square(100); // width: 100, height: 100

// 2. Factory function
const rect = Size({ width: 200, height: 100 });
</script>

<template>
  <!-- Using width and height properties directly (common usage) -->
  <Container :width="100" :height="100">
    <Text data="Square Container" />
  </Container>

  <!-- Using Size object for programmatic calculations -->
  <Container :width="rect.width" :height="rect.height">
    <Text data="Rectangle Container" />
  </Container>
</template>
```

## API

### Types

```typescript
export interface SizeType {
  width?: number | string;
  height?: number | string;
}

export type Size = SizeType;
```

### Methods

#### Size()

Factory function for creating Size objects, similar to Flutter's `Size` constructor.

```typescript
function Size(props: SizeType): SizeType;
```

#### Size.square()

Creates a square Size with the given dimension, similar to Flutter's `Size.square()`.

```typescript
function square(dimension: number | string): SizeType;
```

#### Size.fromWidth()

Creates a Size with the given width and infinite height, similar to Flutter's `Size.fromWidth()`.

```typescript
function fromWidth(width: number | string): SizeType;
```

#### Size.fromHeight()

Creates a Size with the given height and infinite width, similar to Flutter's `Size.fromHeight()`.

```typescript
function fromHeight(height: number | string): SizeType;
```

### Static Properties

#### Size.zero

A Size with zero width and height, similar to Flutter's `Size.zero`.

```typescript
const zero: SizeType;
```

#### Size.infinite

A Size with infinite width and height, similar to Flutter's `Size.infinite`.

```typescript
const infinite: SizeType;
```

## Common Usage Patterns

### Direct Width and Height (Recommended)

In most cases, you'll directly use the `width` and `height` properties on widgets:

```vue
<Container :width="100" :height="100">
  <Text data="Square Container" />
</Container>

<SizedBox :width="200" :height="100">
  <Text data="Rectangle SizedBox" />
</SizedBox>
```

### Programmatic Size Calculation

Use Size objects for programmatic calculations:

```vue
<script setup>
import { Size, Container, Text, BoxDecoration, TextStyle } from "fluekit";

const baseSize = 100;
const squareSize = Size.square(baseSize * 2);

const blueDecoration = BoxDecoration({ color: "blue" });
const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Container :width="squareSize.width" :height="squareSize.height" :decoration="blueDecoration">
    <Text data="Dynamic Size" :style="whiteTextStyle" />
  </Container>
</template>
```

### API Consistency

Size objects are used internally for API consistency with Flutter, but you typically won't need to use them directly in your templates.
