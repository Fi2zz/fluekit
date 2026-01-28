<template>
  <div :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type Props } from "./usePosition";

defineOptions({ inheritAttrs: false });
const props = defineProps<Props>();
const style = usePositionStyle(props, "fixed");
</script>
