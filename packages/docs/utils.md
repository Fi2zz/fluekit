# Utils & API Reference

FlueKit provides a collection of utility functions and constants to help you build layouts more efficiently.

## Layout Constants

### Alignment

Defines alignment geometry, commonly used in `Container`, `Align`, `Stack`, and other components.

```typescript
import { Alignment } from "fluekit";

// Examples
// Alignment.center
// Alignment.topLeft
// Alignment.bottomRight
```

Available values:

- `topLeft`, `topCenter`, `topRight`
- `centerLeft`, `center`, `centerRight`
- `bottomLeft`, `bottomCenter`, `bottomRight`

### MainAxisAlignment

Defines how children should be placed along the main axis in a Flex layout (Row/Column).

```typescript
import { MainAxisAlignment } from "fluekit";
```

Available values:

- `start`: Place children from the start.
- `end`: Place children from the end.
- `center`: Place children as close to the middle as possible.
- `spaceBetween`: Place free space evenly between the children.
- `spaceAround`: Place free space evenly between the children as well as half of that space before and after the first and last child.
- `spaceEvenly`: Place free space evenly between the children as well as before and after the first and last child.

### CrossAxisAlignment

Defines how children should be placed along the cross axis in a Flex layout (Row/Column).

```typescript
import { CrossAxisAlignment } from "fluekit";
```

Available values:

- `start`, `end`, `center`, `stretch`, `baseline`

### StackFit

Defines how a `Stack` should size the non-positioned children.

```typescript
import { StackFit } from "fluekit";
```

Available values:

- `loose`: The constraints passed to the stack from its parent are loosened (default).
- `expand`: The constraints passed to the stack from its parent are tightened to the biggest size allowed.
- `passthrough`: The constraints passed to the stack from its parent are passed unmodified to the non-positioned children.

### Clip

Defines how to clip the content of a component (e.g. `Container`).

```typescript
import { Clip } from "fluekit";
```

Available values:

- `none`: No clipping (default).
- `hardEdge`: Clip, but do not apply anti-aliasing (fastest).
- `antiAlias`: Clip with anti-aliasing.
- `antiAliasWithSaveLayer`: Clip with anti-aliasing and save layer (slower).

### BoxFit

Defines how a box should be inscribed into another box (e.g. for images).

```typescript
import { BoxFit } from "fluekit";
```

Available values:

- `contain`: As large as possible while still containing the source within the target box.
- `cover`: As small as possible while still covering the entire target box.
- `fill`: Fill the target box by distorting the source's aspect ratio.
- `fitWidth`: Make sure the full width of the source is shown.
- `fitHeight`: Make sure the full height of the source is shown.
- `none`: Align the source inside the target box (by default, centered) and discard any portions of the source that lie outside the box.
- `scaleDown`: Align the source inside the target box (by default, centered) and, if necessary, scale the source down to ensure that the source fits within the box.

### BoxShape

Defines the shape of a box.

```typescript
import { BoxShape } from "fluekit";
```

Available values:

- `rectangle`: A rectangular shape (default).
- `circle`: A circular shape.

## Types & Helpers

### EdgeInsets

Defines immutable insets (padding or margin).

Supported object structure:

```typescript
// Type Alias: type EdgeInsets = EdgeInsetsProps;
interface EdgeInsetsProps {
  // all?: number; // 'all' property is NOT supported. Use EdgeInsets.all()
  horizontal?: number; // Horizontal (left + right)
  vertical?: number; // Vertical (top + bottom)
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
```

Usage examples:

```vue
<script setup>
import { EdgeInsets } from "fluekit";

// 1. Uniform padding (Flutter style)
const allPadding = EdgeInsets.all(10); // Returns { top: 10, right: 10, ... }

// 2. Symmetric padding
const symmetricPadding = EdgeInsets.symmetric({ horizontal: 20, vertical: 10 });

// 3. Individual sides
const onlyTop = EdgeInsets.only({ top: 15 });
const mixed = EdgeInsets.only({ left: 10, right: 10, top: 20 });

// 4. Factory function (Acts as .only)
const custom = EdgeInsets({ top: 10, left: 5 });
// Note: EdgeInsets({ all: 10 }) is invalid. Use EdgeInsets.all(10).
</script>

<template>
  <Container :padding="allPadding">
    <Text data="Content" />
  </Container>

  <Container :margin="EdgeInsets.symmetric({ vertical: 20 })" />
</template>
```

### BorderRadius

Defines immutable border radii.

Supported object structure:

```typescript
// Type Alias: type BorderRadius = BorderRadiusType;
type BorderRadiusType = {
  // all?: number; // 'all' property is NOT supported. Use BorderRadius.all()
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
};
```

Usage examples:

```vue
<script setup>
import { BorderRadius } from "fluekit";

// 1. Circular radius for all corners (Flutter style)
const circular = BorderRadius.circular(10); // Returns { topLeft: 10, ... }
const all = BorderRadius.all(10); // Alias

// 2. Specific corners
const topRounded = BorderRadius.only({
  topLeft: 10,
  topRight: 10,
});

// 3. Zero radius
const zero = BorderRadius.zero;
</script>

<template>
  <Container :decoration="{ color: 'blue', borderRadius: circular }" />
</template>
```

### BoxConstraints

Defines immutable layout constraints.

```typescript
// Type Alias: type BoxConstraints = BoxConstraintsProps;
interface BoxConstraintsProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
```

Usage examples:

```vue
<script setup>
import { BoxConstraints } from "fluekit";

// 1. Loose constraints (0 to max)
const loose = BoxConstraints.loose({ width: 200, height: 100 });

// 2. Tight constraints (fixed size)
const tight = BoxConstraints.tight({ width: 100, height: 100 });

// 3. Expand (infinity or specified)
const expanded = BoxConstraints.expand(); // fill available space
const expandWidth = BoxConstraints.expand({ width: 200 }); // fixed width, infinite height
</script>

<template>
  <Container :constraints="tight">
    <Text data="Fixed Size" />
  </Container>
</template>
```

### TextStyle

Defines the style of text, corresponding to Flutter's TextStyle.

```typescript
// Type Alias: type TextStyle = TextStyleProps;
interface TextStyleProps {
  color?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  letterSpacing?: number;
  wordSpacing?: number;
  textBaseline?: TextBaseline;
  height?: number; // Line height
  decoration?: TextDecoration;
  // ...
}
```

Usage examples:

```vue
<script setup>
import { TextStyle, FontWeight, TextDecoration } from "fluekit";

// 1. Basic style
const bodyText = TextStyle({
  fontSize: 14,
  color: "#333333",
});

// 2. Bold and italic
const titleText = TextStyle({
  fontSize: 24,
  fontWeight: FontWeight.bold,
  fontStyle: "italic",
});

// 3. Text with decoration (underline)
const linkText = TextStyle({
  color: "blue",
  decoration: TextDecoration.underline,
});
</script>

<template>
  <Text data="Hello World" :style="titleText" />
</template>
```

### Border

Defines a border side.

```typescript
interface BorderSide {
  width?: number;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "double" | "none";
}

interface Borders {
  // all?: BorderSide; // 'all' property is NOT supported. Use Border.all()
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}
```

Usage examples:

```vue
<script setup>
import { Border } from "fluekit";

// 1. Uniform border (Flutter style)
// Returns { top: side, bottom: side, left: side, right: side }
const allBorder = Border.all({ color: "black", width: 1 });

// 2. Single side definition (Helper for creating a Side)
const side = Border({ width: 2, color: "red" });
</script>

<template>
  <!-- Uniform border using helper -->
  <Container :decoration="{ border: allBorder }" />

  <!-- Manual composition -->
  <Container
    :decoration="{
      border: {
        bottom: side,
        top: Border({ style: 'dashed', width: 1 }),
      },
    }"
  />
</template>
```

### Size

Defines a size with width and height.

```typescript
// Type Alias: type Size = SizeType;
interface SizeType {
  width?: number | string;
  height?: number | string;
}
```

Usage examples:

```vue
<script setup>
import { Size } from "fluekit";

// 1. Flutter-style helpers
const zero = Size.zero;
const infinite = Size.infinite;
const fixedHeight = Size.fromHeight(200); // width: Infinity
const fixedWidth = Size.fromWidth(100); // height: Infinity
const square = Size.square(100); // width: 100, height: 100

// 2. Legacy usage
const rect = Size({ width: 200, height: 100 });
</script>
```

### BoxDecoration

Defines the decoration of a box.

```typescript
// Type Alias: type BoxDecoration = BoxDecorationProps;
interface BoxDecorationProps {
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow | BoxShadow[];
  gradient?: string; // CSS string or result of LinearGradient()
  image?: DecorationImage;
  overflow?: Overflow;
  opacity?: number | string;
  shape?: BoxShape;
}
```

Usage examples:

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
  <Container :decoration="shadowDecoration" :width="100" :height="100" />
</template>
```

### BoxShadow

Defines a box shadow.

```typescript
interface BoxShadowProps {
  color?: string;
  offset?: { x: number; y: number };
  blurRadius?: number;
  spreadRadius?: number;
  blurStyle?: "normal" | "solid" | "outer" | "inner";
}
```

### Gradients

Helper functions to create CSS gradients.

#### LinearGradient

```typescript
function LinearGradient(props: {
  colors: string[];
  stops?: number[];
  begin?: Alignment; // default: centerLeft
  end?: Alignment; // default: centerRight
  tileMode?: TileMode;
}): string;
```

#### RadialGradient

```typescript
function RadialGradient(props: {
  colors: string[];
  stops?: number[];
  center?: Alignment; // default: center
  radius?: number; // default: 0.5
}): string;
```

## Composition API (Hooks)

### useOpacity

Returns the cumulative opacity of the current context.

Useful for custom components that need to be aware of the parent `Opacity` value (e.g., for Canvas rendering).

```typescript
import { useOpacity } from "fluekit";

const opacity = useOpacity();
// opacity.value is a number between 0 and 1, representing the cumulative opacity from the root to the current node.
```

## Global Configuration

### px2vw

FlueKit uses a `px` to `vw` responsive solution by default. The default design width is **750px**.

```typescript
import { px2vw } from "fluekit";

console.log(px2vw(750)); // "100vw"
console.log(px2vw(375)); // "50vw"
```

### setDefaultVW

Sets the default design width. Recommended to call this at the entry point of your application.

```typescript
import { setDefaultVW } from "fluekit";

// Set design width to 375px
setDefaultVW(375);
```

### setTransform

Enables or disables automatic `px` to `vw` conversion. Defaults to `true` internally for processing logic, but the library initialization sets it to `false` by default (meaning numbers are treated as px unless configured otherwise).

```typescript
import { setTransform } from "fluekit";

setTransform(false); // Disable conversion, numbers will be treated as px
```

### setBaseUrl

Sets the Base URL for image resources, used for automatically handling relative path images.

```typescript
import { setBaseUrl } from "fluekit";

setBaseUrl("https://cdn.example.com/assets/");
```
