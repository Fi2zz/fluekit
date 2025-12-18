# FlueKit

**FlueKit** is a Vue 3 component library that brings **Flutter's layout paradigm** to the web. It allows you to build complex, responsive user interfaces using declarative, composable widgets instead of struggling with CSS layout quirks.

## ✨ Features

- **Flutter-like API**: Familiar widget names and properties (`Row`, `Column`, `Stack`, `Container`, `Expanded`, etc.).
- **Responsive by Default**: Built-in `px` to `vw` conversion system for mobile-first development.
- **Type Safe**: Written in TypeScript with full type definitions.
- **Composable**: Build UIs by nesting components, just like in Flutter.
- **Zero-CSS Layouts**: Handle alignment, padding, margin, and positioning purely through props.

## 📦 Installation

```bash
npm install fluekit
# or
pnpm add fluekit
# or
yarn add fluekit
```

## 🚀 Usage

### Basic Example

```vue
<script setup>
import { Container, Column, Row, Text, SizedBox, Alignment, MainAxisAlignment } from "fluekit";
</script>

<template>
  <Container alignment="center" color="#f5f5f5" :height="400">
    <Column :mainAxisAlignment="MainAxisAlignment.center">
      <!-- Avatar -->
      <Container
        :width="80"
        :height="80"
        :decoration="{
          color: 'blue',
          borderRadius: { all: 40 },
          boxShadow: [{ color: '#00000033', blurRadius: 10, offset: { x: 0, y: 5 } }],
        }"
      />

      <SizedBox :height="20" />

      <!-- Text Content -->
      <Text :style="{ fontSize: 24, fontWeight: 'bold' }"> Hello FlueKit </Text>

      <SizedBox :height="8" />

      <Text :style="{ color: '#666' }"> Flutter-style layouts in Vue 3 </Text>
    </Column>
  </Container>
</template>
```

### Responsive Design (px to vw)

FlueKit automatically converts number values (e.g., `:width="100"`) to `vw` units based on a default design width of **750px**.

To change the design width (e.g., to 375px):

```typescript
import { setDefaultVW } from "fluekit";

// Call this in your main.ts or App.vue setup
setDefaultVW(375);
```

To disable automatic conversion:

```typescript
import { setTransform } from "fluekit";

setTransform(false); // Numbers will be treated as px
```

## 🧩 Component Overview

### Layout Widgets

- **Container**: A convenience widget that combines common painting, positioning, and sizing.
- **Row / Column**: Flexbox layouts for horizontal and vertical arrays.
- **Stack / Positioned**: Overlapping layouts.
- **Expanded**: Expands a child of a Row or Column to fill available space.
- **SizedBox**: A box with a specified size.
- **Center / Align**: Alignment widgets.
- **Wrap**: A widget that displays its children in multiple horizontal or vertical runs.

### Scrolling

- **ListView**: A scrollable list of widgets.
- **GridView**: A scrollable, 2D array of widgets.
- **ScrollView**: A box in which a single widget can be scrolled.

### Painting & Effects

- **Opacity / AnimatedOpacity**: Makes its child partially transparent.
- **Transform**: Applies a transformation before painting its child.
- **Decorations**: Rich styling support via `BoxDecoration` (borders, shadows, gradients, images).

### Interactions

- **GestureDetector**: Detects gestures (tap, double tap, pan, long press).
- **IgnorePointer**: Invisible widget that controls hit-testing.

## 📄 License

MIT
