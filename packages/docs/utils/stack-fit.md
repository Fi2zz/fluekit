# StackFit

Defines how a `Stack` should size the non-positioned children.

## Usage Examples

```vue
<script setup>
import { StackFit, Stack, Container, EdgeInsets, BoxDecoration, TextStyle, Text } from "fluekit";

const containerDecoration = BoxDecoration({ border: "1px solid #ccc" });
const redDecoration = BoxDecoration({ color: "red" });
const blueDecoration = BoxDecoration({ color: "blue" });
const greenDecoration = BoxDecoration({ color: "green" });
const smallTextStyle = TextStyle({ marginBottom: "10px", fontSize: "12px" });
const smallWhiteTextStyle = TextStyle({ color: "white", fontSize: "12px" });
</script>

<template>
  <Container :padding="EdgeInsets.all(10)">
    <Row :gap="20">
      <Container :width="150" :height="150" :decoration="containerDecoration">
        <Text data="StackFit.loose" :style="smallTextStyle" />
        <Stack fit="loose" :height="120">
          <Container :width="80" :height="80" :decoration="redDecoration" alignment="center">
            <Text data="Loose" :style="smallWhiteTextStyle" />
          </Container>
        </Stack>
      </Container>

      <Container :width="150" :height="150" :decoration="containerDecoration">
        <Text data="StackFit.expand" :style="smallTextStyle" />
        <Stack fit="expand" :height="120">
          <Container :decoration="blueDecoration" alignment="center">
            <Text data="Expand" :style="smallWhiteTextStyle" />
          </Container>
        </Stack>
      </Container>
    </Row>
  </Container>
</template>
```

## API

### Types

```typescript
export type StackFit = Valueof<typeof StackFit>;
```

### Constants

```typescript
export const StackFit = {
  loose: "loose",
  expand: "expand",
  passthrough: "passthrough",
} as const;
```

### Available Values

- `loose` - The constraints passed to the stack from its parent are loosened (default).
- `expand` - The constraints passed to the stack from its parent are tightened to the biggest size allowed.
- `passthrough` - The constraints passed to the stack from its parent are passed unmodified to the non-positioned children.

## Examples

### StackFit.loose

```vue
<Stack fit="loose">
  <Container :width="100" :height="100" :decoration="redDecoration" />
</Stack>
```

### StackFit.expand

```vue
<Stack fit="expand">
  <Container :decoration="blueDecoration" />
</Stack>
```

### StackFit.passthrough

```vue
<Stack fit="passthrough">
  <Container :decoration="greenDecoration" />
</Stack>
```
