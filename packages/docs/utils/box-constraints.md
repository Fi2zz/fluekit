# BoxConstraints

Defines immutable layout constraints for widgets.

## Usage Examples

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

  <Container :constraints="expanded">
    <Text data="Expanded" />
  </Container>
</template>
```

## API

### Types

```typescript
export interface BoxConstraintsProps {
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export type BoxConstraints = BoxConstraintsProps;
```

### Methods

#### BoxConstraints()

Factory function for creating BoxConstraints objects.

```typescript
function BoxConstraints(props: BoxConstraintsProps = {}): BoxConstraintsProps;
```

#### BoxConstraints.loose()

Creates loose constraints with the given maximum width and height.

```typescript
function loose(size: { width: number | string; height: number | string }): BoxConstraintsProps;
```

#### BoxConstraints.tight()

Creates tight constraints with the given width and height.

```typescript
function tight(size: { width: number | string; height: number | string }): BoxConstraintsProps;
```

#### BoxConstraints.expand()

Creates constraints that expand to fill the available space.

```typescript
function expand(size?: { width?: number | string; height?: number | string }): BoxConstraintsProps;
```

## Examples

### Fixed Size Constraints

```vue
<Container :constraints="BoxConstraints.tight({ width: 150, height: 100 })">
  <Text data="Fixed Size Container" />
</Container>
```

### Minimum Size Constraints

```vue
<Container :constraints="BoxConstraints({ minWidth: 200, minHeight: 100 })">
  <Text data="Minimum Size Container" />
</Container>
```

### Maximum Size Constraints

```vue
<Container :constraints="BoxConstraints({ maxWidth: 300, maxHeight: 200 })">
  <Text data="Maximum Size Container" />
</Container>
```

### Range Constraints

```vue
<Container
  :constraints="BoxConstraints({ minWidth: 100, maxWidth: 200, minHeight: 50, maxHeight: 150 })"
>
  <Text data="Range Constraints Container" />
</Container>
```
