<template>
  <div :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { animationToStyle, type AnimationOptions } from "./Animator";
interface Props {
  animation: AnimationOptions;
}
const props = defineProps<Props>();
const computedStyle = computed<CSSProperties>(() => {
  return animationToStyle(props.animation) as CSSProperties;
});
</script>
