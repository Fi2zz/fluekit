<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type Props } from "./usePosition";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  zIndex: 100, // Fixed 元素通常需要较高的层级
});
const style = usePositionStyle(props, "fixed");
</script>
