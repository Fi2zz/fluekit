<template>
  <div :style="style" class="flue-aspect-ratio">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

interface Props {
  /**
   * The aspect ratio to attempt to use.
   *
   * The aspect ratio is expressed as a ratio of width to height. For example, a 16:9 width:height aspect ratio would have a value of 16.0/9.0.
   */
  aspectRatio: number;
}

const props = defineProps<Props>();

const style = computed<CSSProperties>(() => {
  return {
    aspectRatio: `${props.aspectRatio}`,
  };
});
</script>

<style scoped>
.flue-aspect-ratio {
  display: grid;
  /* 确保子元素填满容器，模拟 Flutter AspectRatio 的 tight constraint 行为 */
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}
</style>
