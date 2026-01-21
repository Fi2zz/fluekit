# Drawer

A Material Design panel that slides in horizontally from the edge of a [Scaffold](scaffold.md) to show navigation links in an application.

## Usage

A `Drawer` is typically used with the `Scaffold.drawer` property. The child of the drawer is usually a [ListView](list-view.md) whose first child is a `DrawerHeader` (or a Container that simulates it).

<script setup>
import DrawerDemo from '../demos/new_components/DrawerDemo.vue'
import StandaloneDrawerDemo from '../demos/new_components/StandaloneDrawerDemo.vue'
</script>

<div class="demo-container">
  <DrawerDemo />
</div>

## Code Example

<<< ../demos/new_components/DrawerDemo.vue

## Standalone Usage

Although typically used with `Scaffold`, you can use `Drawer` independently. The `Drawer` component handles its own overlay and transitions.

<div class="demo-container">
  <StandaloneDrawerDemo />
</div>

<<< ../demos/new_components/StandaloneDrawerDemo.vue

## Props

| Prop            | Type               | Default           | Description                                                            |
| --------------- | ------------------ | ----------------- | ---------------------------------------------------------------------- |
| open            | `boolean`          | `false`           | Controls the visibility of the drawer (v-model).                       |
| backgroundColor | `string \| Color`  | `Colors.white`    | The background color of the drawer.                                    |
| elevation       | `number`           | `16`              | The z-coordinate at which to place this drawer relative to its parent. |
| width           | `number`           | `304`             | The width of the drawer.                                               |
| edge            | `'start' \| 'end'` | `'start'`         | The edge from which the drawer slides in.                              |
| overlayColor    | `string \| Color`  | `rgba(0,0,0,0.5)` | The color of the overlay background.                                   |

## Events

| Name        | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| update:open | Emitted when the drawer visibility changes (e.g., clicking overlay). |
| close       | Emitted when the drawer is closed via overlay click.                 |

## Slots

| Name    | Description                               |
| ------- | ----------------------------------------- |
| default | The widget below this widget in the tree. |
