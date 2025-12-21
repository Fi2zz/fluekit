# EdgeInsets

Defines immutable insets (padding or margin) for widgets.

## Usage Examples

```vue
<script setup>
import { EdgeInsets } from "fluekit";

// 1. Uniform padding (Flutter style)
const allPadding = EdgeInsets.all(10); // Returns { top: 10, right: 10, bottom: 10, left: 10 }

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

## API

### Types

```typescript
interface EdgeInsetsProps {
  // 'all' property is NOT supported. Use EdgeInsets.all()
  horizontal?: number; // Horizontal (left + right)
  vertical?: number; // Vertical (top + bottom)
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export type EdgeInsets = EdgeInsetsProps;
```

### Methods

#### EdgeInsets()

Factory function that acts as `.only()`.

```typescript
function EdgeInsets(edgeInsets: EdgeInsetsProps): EdgeInsetsProps;
```

#### EdgeInsets.all()

Creates uniform insets for all sides.

```typescript
function all(value: number | string): EdgeInsetsProps;
```

#### EdgeInsets.symmetric()

Creates insets that are symmetric in the horizontal and vertical directions.

```typescript
function symmetric(insets: {
  horizontal?: number | string;
  vertical?: number | string;
}): EdgeInsetsProps;
```

#### EdgeInsets.only()

Creates insets for specific sides.

```typescript
function only(insets: {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}): EdgeInsetsProps;
```

## Examples

### Uniform Padding

```vue
<Container :padding="EdgeInsets.all(20)">
  <Text data="Uniform Padding" />
</Container>
```

### Symmetric Padding

```vue
<Container :padding="EdgeInsets.symmetric({ horizontal: 30, vertical: 15 })">
  <Text data="Symmetric Padding" />
</Container>
```

### Asymmetric Padding

```vue
<Container :padding="EdgeInsets.only({ top: 10, left: 20, right: 20 })">
  <Text data="Asymmetric Padding" />
</Container>
```
