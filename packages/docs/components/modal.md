# Modal

A generic overlay component for displaying content on top of an application.

## Usage

```vue
<script setup>
import { Modal, Button } from "fluekit";
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <Button @pressed="visible = true">Open Modal</Button>

  <Modal v-model:visible="visible">
    <div class="bg-white p-4 rounded">Content goes here</div>
  </Modal>
</template>
```

## Examples

### Basic Usage

<script setup>
import BasicDemo from '../demos/modal/BasicDemo.vue';
import AlignmentDemo from '../demos/modal/AlignmentDemo.vue';
</script>

<BasicDemo />

### Alignment

The `alignment` prop allows you to position the modal content in 9 different positions on the screen.

<AlignmentDemo />

## Props

| Prop                 | Type        | Default                | Description                                               |
| -------------------- | ----------- | ---------------------- | --------------------------------------------------------- |
| `visible`            | `boolean`   | `false`                | Controls the visibility of the modal. Supports `v-model`. |
| `barrierDismissible` | `boolean`   | `true`                 | Whether tapping the barrier closes the modal.             |
| `barrierColor`       | `string`    | `'rgba(0, 0, 0, 0.5)'` | Color of the background barrier.                          |
| `alignment`          | `Alignment` | `Alignment.center`     | Alignment of the content within the modal.                |
| `zIndex`             | `number`    | `useZIndex()`          | Z-index of the modal.                                     |

## Events

| Event            | Payload   | Description                                          |
| ---------------- | --------- | ---------------------------------------------------- |
| `update:visible` | `boolean` | Emitted when visibility changes (e.g., barrier tap). |
| `close`          | -         | Emitted when the modal is closed via barrier tap.    |

## Slots

| Name      | Description               |
| :-------- | :------------------------ |
| `default` | The content of the modal. |
