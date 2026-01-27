<template>
  <div :style="style">
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
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "100%",
  };
});
</script>
