<template>
  <div class="fluekit-backdrop-filter" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { ImageFilter } from "./ImageFilter";

interface Props {
  filter: ImageFilter | string;
  blendMode?: CSSProperties["mixBlendMode"];
}

const props = defineProps<Props>();

const style = computed(() => {
  const filterValue = props.filter.toString();
  return {
    backdropFilter: filterValue,
    WebkitBackdropFilter: filterValue, // Safari support
    mixBlendMode: props.blendMode,
  } as CSSProperties;
});
</script>
