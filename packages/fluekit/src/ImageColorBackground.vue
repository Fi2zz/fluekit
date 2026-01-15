<template>
  <div class="flue-image-color-background" :style="containerStyle">
    <slot :color="dominantColor" :is-loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, type CSSProperties } from "vue";
import { Color } from "./Color";
import { ImageUtils } from "./ImageUtils";

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  /**
   * The opacity of the generated background color.
   * Default: 1.0
   */
  opacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  opacity: 1.0,
});

const dominantColor = ref<Color | null>(null);
const isLoading = ref(true);

const containerStyle = computed<CSSProperties>(() => {
  return {
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
    height: typeof props.height === "number" ? `${props.height}px` : props.height,
    backgroundColor: dominantColor.value
      ? dominantColor.value.withOpacity(props.opacity).toString()
      : "transparent",
    transition: "background-color 0.5s ease",
  };
});

const updateColor = async (imageSrc: string) => {
  isLoading.value = true;
  dominantColor.value = null;

  const color = await ImageUtils.extractDominantColor(imageSrc);
  if (color) {
    dominantColor.value = color;
  }

  isLoading.value = false;
};

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      updateColor(newSrc);
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.flue-image-color-background {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>
