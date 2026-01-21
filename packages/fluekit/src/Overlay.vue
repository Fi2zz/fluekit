<template>
  <transition name="fluekit-overlay-fade">
    <div v-if="visible" :style="style" @click="handleClick">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Color, resolveColor } from "./Color";
defineOptions({ inheritAttrs: false });
interface Props {
  visible?: boolean;
  color?: string | Color;
  zIndex?: number;
  position?: "absolute" | "fixed" | "sticky";
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  color: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  position: "absolute",
});
const emit = defineEmits<{ (e: "tap"): void }>();
const handleClick = () => emit("tap");

const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: resolveColor(props.color),
    zIndex: props.zIndex,
    position: props.position,
    inset: 0,
    pointerEvents: "auto",
    cursor: "auto",
  };
});
</script>

<style scoped>
.fluekit-overlay-fade-enter-active,
.fluekit-overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.fluekit-overlay-fade-enter-from,
.fluekit-overlay-fade-leave-to {
  opacity: 0;
}
</style>
