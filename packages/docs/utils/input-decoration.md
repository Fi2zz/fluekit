# InputDecoration

Defines the appearance of a `TextField`.

## Usage

```vue
<script setup>
import { TextField, InputDecoration, OutlineInputBorder, Colors } from "fluekit";

const decoration = InputDecoration({
  labelText: "Username",
  hintText: "Enter your username",
  border: OutlineInputBorder(),
  prefixText: "@",
});
</script>

<template>
  <TextField :decoration="decoration" />
</template>
```

## API

### InputDecoration Interface

```typescript
export interface InputDecoration {
  labelText?: string;
  hintText?: string;
  helperText?: string;
  errorText?: string;

  prefixText?: string;
  suffixText?: string;

  border?: InputBorder;
  enabledBorder?: InputBorder;
  focusedBorder?: InputBorder;
  errorBorder?: InputBorder;
  disabledBorder?: InputBorder;

  filled?: boolean;
  fillColor?: string;

  contentPadding?: number | number[];

  labelStyle?: TextStyle;
  hintStyle?: TextStyle;
  errorStyle?: TextStyle;
}
```

### InputBorder

Base interface for input borders.

#### OutlineInputBorder

Creates a rounded rectangle outline border.

```typescript
function OutlineInputBorder(options?: {
  borderSide?: BorderSide;
  borderRadius?: BorderRadius;
}): InputBorder;
```

#### UnderlineInputBorder

Creates an underline border.

```typescript
function UnderlineInputBorder(options?: {
  borderSide?: BorderSide;
  borderRadius?: BorderRadius;
}): InputBorder;
```
