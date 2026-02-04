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

## ShowModal (Imperative API)

`showModal` allows you to open a modal imperatively without needing to manage a visible state variable in your template. This is useful for simple alerts, confirmations, or modals triggered from non-component logic.

## Examples

<script setup>
import BasicDemo from '../demos/modal/BasicDemo.vue';
</script>

<BasicDemo></BasicDemo>

```ts
import { showModal, Button } from "fluekit";
import { h } from "vue";

// Simple text
showModal({
  content: "Hello World",
  alignment: Alignment.center,
});

// Using VNode
const { close } = showModal({
  content: h("div", { class: "modal-box" }, [
    h("h3", "Title"),
    h(Button, { onPressed: () => close() }, () => "Close"),
  ]),
  barrierDismissible: true,
  onClose: () => console.log("Closed"),
});
```

### showModal Options

The `showModal` function accepts an options object with the following properties:

| Property        | Type                           | Default | Description                                                                         |
| :-------------- | :----------------------------- | :------ | :---------------------------------------------------------------------------------- |
| `content`       | `string \| Component \| VNode` | -       | The content to display in the modal.                                                |
| `contentProps`  | `Record<string, any>`          | -       | Props to pass if `content` is a Component.                                          |
| `onClose`       | `() => void`                   | -       | Callback triggered when the modal is requested to close (e.g. barrier tap).         |
| `onAfterClose`  | `() => void`                   | -       | Callback triggered after the close animation completes.                             |
| `...ModalProps` | `ModalProps`                   | -       | All standard `Modal` props are supported (`alignment`, `barrierDismissible`, etc.). |

The function returns an object with a `close` method:

```ts
const { close } = showModal({ ... });
// later
close();
```

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
