# PopupMenuButton

Displays a menu when pressed and calls `onSelected` when the menu is dismissed because an item was selected.

## Usage

Use `PopupMenuButton` to show a list of options in a popup menu.

<script setup>
import PopupMenuButtonDemo from '../demos/new_components/PopupMenuButtonDemo.vue'
</script>
<div class="demo-container">
  <PopupMenuButtonDemo />
</div>

## Code Example

<<< ../demos/new_components/PopupMenuButtonDemo.vue

## Props

| Prop      | Type                     | Default        | Description                                   |
| --------- | ------------------------ | -------------- | --------------------------------------------- |
| icon      | `Component`              | `MoreVertIcon` | The icon to display in the button.            |
| iconSize  | `number`                 | `24`           | The size of the icon.                         |
| iconColor | `string \| Color`        | -              | The color of the icon.                        |
| color     | `string \| Color`        | `Colors.white` | The background color of the menu.             |
| elevation | `number`                 | `8`            | The z-coordinate at which to place this menu. |
| offset    | `{x: number, y: number}` | `{x: 0, y: 0}` | The offset applied to the menu position.      |
| variant   | `'material' \| 'ios'`    | `'ios'`        | The visual style of the popup menu.           |

## Slots

| Name    | Scope                   | Description                                                            |
| ------- | ----------------------- | ---------------------------------------------------------------------- |
| default | `{ close: () => void }` | The content of the menu. Use the `close` function to dismiss the menu. |
