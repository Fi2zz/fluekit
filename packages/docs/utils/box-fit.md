# BoxFit

Defines how a box should be inscribed into another box (e.g. for images).

## Usage Examples

```vue
<script setup>
import {
  BoxFit,
  Container,
  NetworkImage,
  EdgeInsets,
  BorderRadius,
  BoxDecoration,
  TextStyle,
  Text,
} from "fluekit";

const coverDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/200/300"),
    fit: BoxFit.cover,
  },
});

const containDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/200/300"),
    fit: BoxFit.contain,
  },
});

const smallTextStyle = TextStyle({ marginBottom: "10px", fontSize: "12px" });
</script>

<template>
  <Container :padding="EdgeInsets.all(10)">
    <Row :gap="20">
      <Column>
        <Text data="Cover" :style="smallTextStyle" />
        <Container :width="100" :height="100" :decoration="coverDecoration" />
      </Column>

      <Column>
        <Text data="Contain" :style="smallTextStyle" />
        <Container :width="100" :height="100" :decoration="containDecoration" />
      </Column>
    </Row>
  </Container>
</template>
```

## API

### Types

```typescript
export type BoxFit = Valueof<typeof BoxFit>;
export type ImageRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
```

### Constants

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

### Available Values

- `contain` - As large as possible while still containing the source within the target box.
- `cover` - As small as possible while still covering the entire target box.
- `fill` - Fill the target box by distorting the source's aspect ratio.
- `fitWidth` - Make sure the full width of the source is shown.
- `fitHeight` - Make sure the full height of the source is shown.
- `none` - Align the source inside the target box (by default, centered) and discard any portions of the source that lie outside the box.
- `scaleDown` - Align the source inside the target box (by default, centered) and, if necessary, scale the source down to ensure that the source fits within the box.

## Examples

### Various BoxFit Values

```vue
<Container :padding="EdgeInsets.all(10)">
  <Row :gap="10" wrap>
    <Column v-for="fit in ['contain', 'cover', 'fill', 'fitWidth', 'fitHeight', 'none', 'scaleDown']" :key="fit">
      <Text :data="fit" :style="smallTextStyle" />
      <Container
        :width="80"
        :height="80"
        :decoration="BoxDecoration({
          color: '#eee',
          image: {
            image: NetworkImage('https://picsum.photos/100/150'),
            fit: fit,
          },
        })"
      />
    </Column>
  </Row>
</Container>
```
