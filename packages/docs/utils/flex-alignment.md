# Flex Alignment

Defines how children should be placed along the main axis and cross axis in a Flex layout (Row/Column).

## Usage Examples

```vue
<script setup>
import { MainAxisAlignment, CrossAxisAlignment, Row, Container, EdgeInsets, BoxDecoration, TextStyle, Text } from "fluekit";

const redDecoration = BoxDecoration({ color: 'red' });
const greenDecoration = BoxDecoration({ color: 'green' });
const blueDecoration = BoxDecoration({ color: 'blue' });
const borderDecoration = BoxDecoration({ border: '1px solid #ccc' });
const whiteTextStyle = TextStyle({ color: 'white' });
const marginTextStyle = TextStyle({ marginBottom: '10px' });
</script>

<template>
  <Container :padding="EdgeInsets.all(10)">
    <Text data="MainAxisAlignment.spaceBetween" :style="marginTextStyle" />
    <Row mainAxisAlignment="spaceBetween" :margin="EdgeInsets.only({ bottom: '20px' })" />
      <Container :width="50" :height="50" :decoration="redDecoration" alignment="center"><Text data="1" :style="whiteTextStyle" /></Container>
      <Container :width="50" :height="50" :decoration="greenDecoration" alignment="center"><Text data="2" :style="whiteTextStyle" /></Container>
      <Container :width="50" :height="50" :decoration="blueDecoration" alignment="center"><Text data="3" :style="whiteTextStyle" /></Container>
    </Row>

    <Text data="CrossAxisAlignment.end" :style="marginTextStyle" />
    <Row mainAxisAlignment="center" crossAxisAlignment="end" :height="100" :decoration="borderDecoration">
      <Container :width="50" :height="30" :decoration="redDecoration" alignment="center"><Text data="1" :style="whiteTextStyle" /></Container>
      <Container :width="50" :height="60" :decoration="greenDecoration" alignment="center"><Text data="2" :style="whiteTextStyle" /></Container>
      <Container :width="50" :height="90" :decoration="blueDecoration" alignment="center"><Text data="3" :style="whiteTextStyle" /></Container>
    </Row>
  </Container>
</template>
```

## API

### Types

```typescript
export type CrossAxisAlignment = Valueof<typeof CrossAxisAlignment> | string;
export type MainAxisAlignment = Valueof<typeof MainAxisAlignment> | string;
```

### Constants

#### MainAxisAlignment

Defines how the children should be placed along the main axis.

```typescript
export const MainAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;
```

#### CrossAxisAlignment

Defines how the children should be placed along the cross axis.

```typescript
export const CrossAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
} as const;
```

### Available Values

#### MainAxisAlignment

- `start` - Place children from the start.
- `end` - Place children from the end.
- `center` - Place children as close to the middle as possible.
- `spaceBetween` - Place free space evenly between the children.
- `spaceAround` - Place free space evenly between the children as well as half of that space before and after the first and last child.
- `spaceEvenly` - Place free space evenly between the children as well as before and after the first and last child.

#### CrossAxisAlignment

- `start` - Place children from the start of the cross axis.
- `end` - Place children from the end of the cross axis.
- `center` - Place children at the center of the cross axis.
- `stretch` - Stretch children to fill the cross axis.
- `baseline` - Align children along their baselines.

## Examples

### MainAxisAlignment Examples

```vue
<Container :padding="EdgeInsets.all(10)">
  <Row mainAxisAlignment="start" :margin="EdgeInsets.only({ bottom: '10px' })"></Row>
  <Row mainAxisAlignment="end" :margin="EdgeInsets.only({ bottom: '10px' })"></Row>
  <Row mainAxisAlignment="center" :margin="EdgeInsets.only({ bottom: '10px' })"></Row>
  <Row mainAxisAlignment="spaceBetween" :margin="EdgeInsets.only({ bottom: '10px' })"></Row>
  <Row mainAxisAlignment="spaceAround" :margin="EdgeInsets.only({ bottom: '10px' })"></Row>
  <Row mainAxisAlignment="spaceEvenly"></Row>
</Container>
```

### CrossAxisAlignment Examples

```vue
<Container :padding="EdgeInsets.all(10)"></Container>
```
