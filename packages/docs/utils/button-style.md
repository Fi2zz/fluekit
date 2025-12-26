# ButtonStyle

Defines the visual properties for Button components.

## Usage

`ButtonStyle` is typically used with the `Button` component to customize its appearance.

```vue
<script setup>
import { Button, ButtonStyle, EdgeInsets, Colors, BorderRadius } from "fluekit";

const myButtonStyle = ButtonStyle({
  backgroundColor: "blue",
  foregroundColor: "white",
  padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 10 }),
  shape: BorderRadius.circular(8),
  elevation: 2,
});
</script>

<template>
  <Button :style="myButtonStyle" @click="onClick"> Click Me </Button>
</template>
```

## API

### ButtonStyle Interface

```typescript
export interface ButtonStyle {
  backgroundColor?: string;
  foregroundColor?: string; // Text color
  overlayColor?: string; // Ripple color (reserved)
  shadowColor?: string;
  elevation?: number;
  padding?: EdgeInsets;
  minimumSize?: SizeType;
  maximumSize?: SizeType;
  fixedSize?: SizeType;
  side?: BorderSide;
  shape?: BorderRadius;
  alignment?: Alignment;
}
```

### Properties

- **backgroundColor**: Background color of the button.
- **foregroundColor**: Color of the text and icons within the button.
- **shadowColor**: Color of the shadow when elevation is > 0.
- **elevation**: Z-axis elevation, controls shadow size.
- **padding**: Internal padding (`EdgeInsets`).
- **minimumSize**: Minimum dimensions (`width`, `height`).
- **maximumSize**: Maximum dimensions.
- **fixedSize**: Fixed dimensions (sets min, max, and preferred size).
- **side**: Border configuration (`BorderSide`).
- **shape**: Shape of the button (`BorderRadius`).
- **alignment**: Alignment of the child content.
