# BottomNavigationBar

A navigation bar typically displayed at the bottom of an app, allowing users to select between different views.

It supports both Material Design and iOS (Cupertino) styles via the `variant` prop.

## Usage

<script setup>
import BottomNavigationBarDemo from '@example/demos/new_components/BottomNavigationBarDemo.vue'
</script>

<div class="demo-box">
  <BottomNavigationBarDemo />
</div>

<<< ../demos/new_components/BottomNavigationBarDemo.vue

## API

### Props

| Name                   | Type                        | Default      | Description                                                      |
| :--------------------- | :-------------------------- | :----------- | :--------------------------------------------------------------- |
| `items`                | `BottomNavigationBarItem[]` | -            | The list of items to display in the navigation bar.              |
| `currentIndex`         | `number`                    | `0`          | The index of the currently selected item.                        |
| `variant`              | `'material' \| 'ios'`       | `'material'` | The visual style of the navigation bar.                          |
| `backgroundColor`      | `string`                    | -            | Background color of the navigation bar.                          |
| `selectedItemColor`    | `string`                    | -            | Color of the selected item icon and label.                       |
| `unselectedItemColor`  | `string`                    | -            | Color of unselected items.                                       |
| `showSelectedLabels`   | `boolean`                   | `true`       | Whether to show labels for selected items.                       |
| `showUnselectedLabels` | `boolean`                   | `true`       | Whether to show labels for unselected items.                     |
| `elevation`            | `number`                    | `8`          | The z-coordinate (shadow) of the navigation bar (Material only). |

### BottomNavigationBarItem

| Property     | Type        | Description                                   |
| :----------- | :---------- | :-------------------------------------------- |
| `icon`       | `Component` | The icon to display.                          |
| `activeIcon` | `Component` | The icon to display when selected (optional). |
| `label`      | `string`    | The text label for the item.                  |

### Events

| Name                  | Description                              | Parameters      |
| :-------------------- | :--------------------------------------- | :-------------- |
| `update:currentIndex` | Emitted when the selected index changes. | `index: number` |
| `tap`                 | Emitted when an item is tapped.          | `index: number` |
