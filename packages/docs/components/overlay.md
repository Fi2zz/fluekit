# Overlay

A low-level component for creating overlay effects, such as modals, dialogs, or dimming backgrounds.

## Usage

Use `Overlay` inside a `Stack` (usually with `fit="expand"`) to cover the content below it. It includes a built-in fade transition (0.25s ease) similar to iOS modal dimming.

<script setup>
import OverlayDemo from '../demos/new_components/OverlayDemo.vue'
</script>

<div class="demo-container">
  <OverlayDemo />
</div>

## Code Example

<<< ../demos/new_components/OverlayDemo.vue

## Props

| Prop    | Type              | Default              | Description                             |
| ------- | ----------------- | -------------------- | --------------------------------------- |
| visible | `boolean`         | `true`               | Controls the visibility of the overlay. |
| color   | `string \| Color` | `rgba(0, 0, 0, 0.5)` | The background color.                   |
| zIndex  | `number`          | `1000`               | The z-index style property.             |

## Events

| Name | Description                                     |
| ---- | ----------------------------------------------- |
| tap  | Emitted when the overlay background is clicked. |
