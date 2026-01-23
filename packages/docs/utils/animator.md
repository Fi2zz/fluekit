# Animation Utils

Utilities for working with CSS animations and keyframes.

## AnimationWidget

The `AnimationWidget` component allows you to apply CSS keyframe animations to its children.

### Usage

```vue
<script setup>
import { defineKeyframes, Animator, AnimationWidget } from "fluekit";

// 1. Define keyframes once (globally or locally)
defineKeyframes("bounce", {
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-20px)" },
});

// 2. Create animation options
const bounceAnim = Animator({
  name: "bounce",
  duration: 1000,
  iterationCount: "infinite",
});
</script>

<template>
  <AnimationWidget :animation="bounceAnim">
    <div>Bouncing Content</div>
  </AnimationWidget>
</template>
```

## Examples

### Keyframe Demo

<script setup>
import KeyframeDemo from '../demos/animation/KeyframeDemo.vue';
import MoreAnimationsDemo from '../demos/animation/MoreAnimationsDemo.vue';
</script>

<KeyframeDemo />

### More Animations

<MoreAnimationsDemo />

## API

### Animation(options)

Helper function to create an `AnimationOptions` object with type checking.

### defineKeyframes(name, frames)

Injects a `@keyframes` style block into the document head.

- `name`: Name of the animation.
- `frames`: Object where keys are selectors (e.g. `'0%'`, `'from'`) and values are style objects.

### AnimationWidget Props

| Prop        | Type               | Description                         |
| ----------- | ------------------ | ----------------------------------- |
| `animation` | `AnimationOptions` | The animation configuration object. |

### AnimationOptions

| Property         | Type                   | Default     | Description          |
| ---------------- | ---------------------- | ----------- | -------------------- |
| `name`           | `string`               | -           | Keyframe name        |
| `duration`       | `number`               | `1000`      | Duration in ms       |
| `timingFunction` | `string`               | `'ease'`    | Easing function      |
| `delay`          | `number`               | `0`         | Delay in ms          |
| `iterationCount` | `number \| 'infinite'` | `1`         | Number of iterations |
| `direction`      | `string`               | `'normal'`  | Animation direction  |
| `fillMode`       | `string`               | `'none'`    | Animation fill mode  |
| `playState`      | `string`               | `'running'` | Play state           |
