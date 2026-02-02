<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type PositionProps } from "./usePosition";

defineOptions({ inheritAttrs: false });
const props = defineProps<PositionProps>();
const style = usePositionStyle(props, "fixed");
</script>
