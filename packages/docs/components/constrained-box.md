# ConstrainedBox

A widget that imposes additional constraints on its child.

For example, if you wanted a child to have a minimum 50.0 logical pixels height, you could use `const BoxConstraints(minHeight: 50.0)` as the constraints.

## Usage

<script setup>
import ConstrainedBoxDemo from '@example/demos/layout/ConstrainedBox.vue'
</script>

<div class="demo-box">
  <ConstrainedBoxDemo />
</div>

<<< ../demos/layout/ConstrainedBox.vue

In this example, although the `Container` requests 50x50, the `ConstrainedBox` forces it to be at least 100x100.

## Props

| Prop        | Type             | Default  | Description                                        |
| ----------- | ---------------- | -------- | -------------------------------------------------- |
| constraints | `BoxConstraints` | Required | The additional constraints to impose on the child. |
