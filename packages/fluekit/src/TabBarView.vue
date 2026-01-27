<template>
  <div :style="containerStyle">
    <div :style="contentStyle">
      <!-- Ensure direct children are sized correctly using a wrapper -->
      <div v-for="(child, index) in children" :key="index" :style="childWrapperStyle">
        <component :is="child" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, useSlots } from "vue";

defineOptions({ inheritAttrs: false });
const props = defineProps<{ modelValue: number }>();

const slots = useSlots();
const children = computed(() => {
  const defaultSlot = (slots as any).default;
  return defaultSlot ? defaultSlot() : [];
});

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flex: 1,
};

const contentStyle = computed<CSSProperties>(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
  transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  transform: `translateX(-${props.modelValue * 100}%)`,
}));

const childWrapperStyle: CSSProperties = {
  flex: "0 0 100%",
  width: "100%",
  height: "100%",
};
</script>
