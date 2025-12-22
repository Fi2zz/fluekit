# TextStyle

Defines the style of text, corresponding to Flutter's TextStyle.

## Usage Examples

```vue
<script setup>
import { TextStyle, FontWeight, TextDecoration, Container, Text, EdgeInsets } from "fluekit";

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
  <Container :padding="EdgeInsets.all(10)" />
    <Text data="Body Text" :style="bodyText" />
  </Container>

  <Container :padding="EdgeInsets.all(10)" />
    <Text data="Title Text" :style="titleText" />
  </Container>

  <Container :padding="EdgeInsets.all(10)" />
    <Text data="Link Text" :style="linkText" />
  </Container>
</template>
```

## API

### Types

```typescript
export enum FontWeight {
  w100 = "100",
  w200 = "200",
  w300 = "300",
  w400 = "400",
  w500 = "500",
  w600 = "600",
  w700 = "700",
  w800 = "800",
  w900 = "900",
  thin = "100",
  extraLight = "200",
  light = "300",
  normal = "400",
  medium = "500",
  semiBold = "600",
  bold = "700",
  extraBold = "800",
  black = "900",
}

export enum FontStyle {
  normal = "normal",
  italic = "italic",
}

export enum TextDecoration {
  none = "none",
  underline = "underline",
  overline = "overline",
  lineThrough = "line-through",
}

export enum TextDecorationStyle {
  solid = "solid",
  double = "double",
  dotted = "dotted",
  dashed = "dashed",
  wavy = "wavy",
}

export enum TextAlign {
  left = "left",
  right = "right",
  center = "center",
  justify = "justify",
}

export enum TextOverflow {
  clip = "clip",
  ellipsis = "ellipsis",
  fade = "fade",
}

export enum TextBaseline {
  alphabetic = "alphabetic",
  ideographic = "ideographic",
}

export interface TextShadow {
  color?: string;
  offset?: { x: number; y: number };
  blurRadius?: number;
}

export interface TextStyleProps {
  color?: string;
  fontSize?: number | string;
  fontWeight?: FontWeight | string;
  fontStyle?: FontStyle | string;
  letterSpacing?: number | string;
  wordSpacing?: number | string;
  textBaseline?: TextBaseline;
  height?: number; // Line height
  decoration?: TextDecoration;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyle | string;
  decorationThickness?: number | string;
  fontFamily?: string | string[];
  fontFeatureSettings?: string;
  fontKerning?: string;
  fontSizeAdjust?: number;
  fontStretch?: number | string;
  fontVariantLigatures?: string;
  fontWeightStep?: number;
  locale?: string;
  textCombineUpright?: string;
  textDecorationSkipInk?: string;
  textEmphasis?: string;
  textEmphasisColor?: string;
  textEmphasisPosition?: string;
  textOrientation?: string;
  textRendering?: string;
  textShadow?: TextShadow;
  textShadowColor?: string;
  textTransform?: string;
  whiteSpace?: string;
  wordBreak?: string;
  writingMode?: string;
}

export type TextStyle = TextStyleProps;
```

### Methods

#### TextStyle()

Factory function for creating TextStyle objects.

```typescript
function TextStyle(props: TextStyleProps): TextStyleProps;
```

## Examples

### Basic Text Styling

```vue
<Text
  data="Styled Text"
  :style="
    TextStyle({
      fontSize: 16,
      color: '#333',
      fontWeight: FontWeight.w500,
    })
  "
/>
```

### Decorated Text

```vue
<Text
  data="Underline Text"
  :style="
    TextStyle({
      decoration: TextDecoration.underline,
      decorationColor: 'red',
      decorationStyle: 'dashed',
    })
  "
/>
```

### Shadow Text

```vue
<Text
  data="Shadow Text"
  :style="
    TextStyle({
      fontSize: 20,
      fontWeight: FontWeight.bold,
      textShadow: {
        color: 'rgba(0,0,0,0.5)',
        offset: { x: 2, y: 2 },
        blurRadius: 4,
      },
    })
  "
/>
```
