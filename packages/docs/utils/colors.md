# Colors

Predefined colors for use in your application.

## Visual Reference

<script setup>
import ColorPalette from '@example/demos/utils/ColorPalette.vue'
</script>

<div class="demo-box">
  <ColorPalette />
</div>

<<< ../demos/utils/ColorPalette.vue

## Material Colors

The `Colors` object contains the standard Material Design color palette.

### Usage

```vue
<script setup lang="ts">
import { Colors, Container, Text } from "fluekit";
</script>

<template>
  <Container :color="Colors.red">
    <Text data="Red Background" :style="{ color: Colors.white }" />
  </Container>

  <Container :color="Colors.blue500">
    <Text data="Blue 500" />
  </Container>
</template>
```

### Available Colors

Standard colors include:

- `transparent`
- `black`, `black87`, `black54`, etc.
- `white`, `white70`, `white60`, etc.
- `red`, `pink`, `purple`, `deepPurple`
- `indigo`, `blue`, `lightBlue`, `cyan`
- `teal`, `green`, `lightGreen`, `lime`
- `yellow`, `amber`, `orange`, `deepOrange`
- `brown`, `grey`, `blueGrey`

Each color usually has shades from 50 to 900 (e.g., `red50`, `red100`, ..., `red900`) and accent variations (e.g., `redAccent`, `redAccent100`, ..., `redAccent700`).

## Cupertino Colors

The `CupertinoColors` object contains the standard iOS color palette.

### Usage

```vue
<script setup lang="ts">
import { CupertinoColors, Container, Text } from "fluekit";
</script>

<template>
  <Container :color="CupertinoColors.systemBlue">
    <Text data="System Blue" :style="{ color: CupertinoColors.white }" />
  </Container>
</template>
```

### Available Colors

Standard colors include:

- `activeBlue`, `activeGreen`, `activeOrange`
- `white`, `black`
- `lightBackgroundGray`, `extraLightBackgroundGray`, `darkBackgroundGray`
- `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`
- `systemBlue`, `systemGreen`, `systemIndigo`, `systemOrange`, `systemPink`, `systemPurple`, `systemRed`, `systemTeal`, `systemYellow`, `systemGrey`
- `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`
- `systemGroupedBackground`, `secondarySystemGroupedBackground`, `tertiarySystemGroupedBackground`
- `separator`, `opaqueSeparator`
- `link`
- `destructiveRed`

## Color Manipulation

Both `Colors` and `CupertinoColors` include helper methods for color manipulation.

### withOpacity

Returns a new color with the specified opacity (0.0 to 1.0).

```vue
<script setup lang="ts">
import { Colors, Container, Text } from "fluekit";
</script>

<template>
  <!-- Red with 50% opacity -->
  <Container :color="Colors.withOpacity(Colors.red, 0.5)">
    <Text data="Semi-transparent Red" />
  </Container>
</template>
```

Or use the standalone utility:

```ts
import { ColorUtils } from "fluekit";

const myColor = ColorUtils.withOpacity("#000000", 0.5); // rgba(0, 0, 0, 0.5)
```

### lighten

Lightens a color by a percentage (0.0 to 1.0).

```ts
const lightRed = Colors.lighten(Colors.red, 0.2); // 20% lighter
```

### darken

Darkens a color by a percentage (0.0 to 1.0).

```ts
const darkBlue = Colors.darken(Colors.blue, 0.2); // 20% darker
```

## Color Class

`Colors` and `CupertinoColors` now return `Color` instances instead of strings.
The `Color` class provides methods similar to Flutter's `Color` class.

```ts
import { Colors, Color } from "fluekit";

const red = Colors.red;

// Get properties
console.log(red.red); // 244
console.log(red.green); // 67
console.log(red.blue); // 54
console.log(red.alpha); // 255
console.log(red.opacity); // 1.0

// Methods
const semiTransparentRed = red.withOpacity(0.5);
const newColor = red.withRed(100);
```

### toString()

The `Color` object's `toString()` method returns a CSS-compatible string (e.g., `rgba(255, 0, 0, 1)`), so it can be used directly in style bindings.

```vue
<div :style="{ backgroundColor: Colors.red }"></div>
```

### withAlpha / withRed / withGreen / withBlue

Modify specific channels of a color.

```ts
// Set alpha channel (0-255)
const semiTransparent = Colors.withAlpha(Colors.red, 128);

// Replace red channel (0-255)
const modifiedRed = Colors.withRed(Colors.blue, 100);
```

### computeLuminance

Returns the relative luminance of the color (0.0 to 1.0).

```ts
const lum = Colors.computeLuminance(Colors.white); // 1.0
const isDark = Colors.computeLuminance(myColor) < 0.5;
```
