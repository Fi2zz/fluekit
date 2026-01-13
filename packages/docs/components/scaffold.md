# Scaffold

Implements the basic material design visual layout structure.

This class provides APIs for showing drawers, snack bars, and bottom sheets.

## Usage

<script setup>
import ScaffoldDemo from '@example/demos/new_components/ScaffoldDemo.vue'
</script>

<div class="demo-box">
  <ScaffoldDemo />
</div>

<<< ../demos/new_components/ScaffoldDemo.vue

## API

### Scaffold Props

| Name              | Type     | Default     | Description                                                  |
| :---------------- | :------- | :---------- | :----------------------------------------------------------- |
| `backgroundColor` | `string` | `'#FFFFFF'` | The color of the material used for the body of the scaffold. |

### Scaffold Slots

| Name                   | Description                                                                                                              |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `appBar`               | An app bar to display at the top of the scaffold.                                                                        |
| `body`                 | The primary content of the scaffold.                                                                                     |
| `floatingActionButton` | A button displayed floating above `body`, in the bottom right corner.                                                    |
| `bottomNavigationBar`  | A bottom navigation bar to display at the bottom of the scaffold. See [BottomNavigationBar](./bottom-navigation-bar.md). |
| `drawer`               | A panel displayed to the side of the `body`, often hidden on mobile devices. (Not fully implemented yet)                 |
| `endDrawer`            | A panel displayed to the side of the `body`, opposite the `drawer`. (Not fully implemented yet)                          |

## AppBar

A material design app bar.

### AppBar Props

| Name              | Type         | Default          | Description                                                             |
| :---------------- | :----------- | :--------------- | :---------------------------------------------------------------------- |
| `title`           | `string`     | -                | The primary widget displayed in the app bar.                            |
| `backgroundColor` | `string`     | `'#2196F3'`      | The background color of the app bar.                                    |
| `height`          | `number`     | `56`             | The height of the app bar.                                              |
| `centerTitle`     | `boolean`    | `false`          | Whether the title should be centered.                                   |
| `elevation`       | `number`     | `4`              | The z-coordinate at which to place this app bar relative to its parent. |
| `padding`         | `EdgeInsets` | `horizontal: 16` | The padding around the content.                                         |

### AppBar Slots

| Name      | Description                                            |
| :-------- | :----------------------------------------------------- |
| `title`   | Custom title widget. Overrides `title` prop.           |
| `leading` | A widget to display before the title.                  |
| `actions` | A list of Widgets to display in a row after the title. |
