<template>
  <div class="flutter-sticky" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type Props } from "./usePosition";
defineOptions({ inheritAttrs: false });
// Sticky 也可以支持 width/height，虽然不如 absolute 常用
const props = defineProps<Props>();
const style = usePositionStyle(props, "sticky");
</script>
