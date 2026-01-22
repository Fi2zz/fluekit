# TextButtonWithIcon

A text button that includes an icon, either to the left or right of the label.

## Usage

```vue
<script setup>
import { TextButtonWithIcon, Icons } from "fluekit";
</script>

<template>
  <TextButtonWithIcon :icon="Icons.add" label="Add Item" />
</template>
```

## Examples

### Interactive Demo

<script setup>
import BasicDemo from '../demos/text-button-with-icon/BasicDemo.vue';
</script>

<BasicDemo />

## Props

| Prop           | Type                  | Default                       | Description                                             |
| -------------- | --------------------- | ----------------------------- | ------------------------------------------------------- |
| `icon`         | `string \| Component` | Required                      | The icon to display.                                    |
| `label`        | `string`              | `undefined`                   | The text label.                                         |
| `iconPosition` | `'left' \| 'right'`   | `'left'`                      | Position of the icon relative to the text.              |
| `iconSize`     | `number`              | `24`                          | Size of the icon in pixels.                             |
| `iconColor`    | `string \| Color`     | `undefined`                   | Color of the icon. Defaults to button foreground color. |
| `disabled`     | `boolean`             | `false`                       | Whether the button is disabled.                         |
| `padding`      | `EdgeInsets`          | `vertical: 8, horizontal: 16` | Padding around the content.                             |
| `style`        | `ButtonStyle`         | `undefined`                   | Custom button style overrides.                          |
| `textStyle`    | `TextStyle`           | `undefined`                   | Custom text style overrides.                            |

## Events

| Event        | Payload | Description                                |
| ------------ | ------- | ------------------------------------------ |
| `pressed`    | -       | Emitted when the button is tapped/clicked. |
| `long-press` | -       | Emitted when the button is long pressed.   |
