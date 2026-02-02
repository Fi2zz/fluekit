<template>
  <div class="fluekit-sticky" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type PositionProps } from "./usePosition";
defineOptions({ inheritAttrs: false });
// Sticky 也可以支持 width/height，虽然不如 absolute 常用
const props = defineProps<PositionProps>();
const style = usePositionStyle(props, "sticky");
</script>
