# CupertinoContextMenu

An iOS-style full-screen modal menu that opens on long press.

It provides a blur backdrop and a list of actions, similar to the context menus found in iOS applications.

## Usage

<script setup>
import CupertinoContextMenuDemo from '@example/demos/new_components/CupertinoContextMenuDemo.vue'
</script>

<div class="demo-box">
  <CupertinoContextMenuDemo />
</div>

<<< ../demos/new_components/CupertinoContextMenuDemo.vue

## API

### Props

| Name      | Type                  | Default | Description                                 |
| :-------- | :-------------------- | :------ | :------------------------------------------ |
| `actions` | `ContextMenuAction[]` | `[]`    | The list of actions to display in the menu. |

### ContextMenuAction

| Property              | Type         | Description                                            |
| :-------------------- | :----------- | :----------------------------------------------------- |
| `child`               | `string`     | The text label for the action.                         |
| `isDefaultAction`     | `boolean`    | Whether this action is the default action (bold text). |
| `isDestructiveAction` | `boolean`    | Whether this action is destructive (red text).         |
| `onPressed`           | `() => void` | Callback function when the action is selected.         |
| `icon`                | `Component`  | Optional icon to display next to the text.             |

### Slots

| Name      | Description                                               |
| :-------- | :-------------------------------------------------------- |
| `default` | The content that triggers the context menu on long press. |
