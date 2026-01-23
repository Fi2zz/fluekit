# Animation Utils

Utilities for working with CSS animations and keyframes.

## Keyframe Animation

You can define CSS keyframes dynamically using `defineKeyframes` and apply them using `animationToStyle`.

### Usage

```vue
<script setup>
import { defineKeyframes, animationToStyle } from "fluekit";

// Define keyframes once
defineKeyframes("bounce", {
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-20px)" },
});

const animStyle = animationToStyle({
  name: "bounce",
  duration: 1000,
  iterationCount: "infinite",
});
</script>

<template>
  <div :style="animStyle">Bouncing Content</div>
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

<<< ../demos/animation/KeyframeDemo.vue

## API

### defineKeyframes(name, frames)

Injects a `@keyframes` style block into the document head.

- `name`: Name of the animation.
- `frames`: Object where keys are selectors (e.g. `'0%'`, `'from'`) and values are style objects.

### animationToStyle(options)

Returns a style object with the `animation` property.

`AnimationOptions`:

- `name`: Keyframe name
- `duration`: Duration in ms (default 1000)
- `timingFunction`: Easing function (default 'ease')
- `delay`: Delay in ms (default 0)
- `iterationCount`: Number or 'infinite' (default 1)
- `direction`: 'normal', 'reverse', etc.
- `fillMode`: 'none', 'forwards', etc.
- `playState`: 'running' or 'paused'
