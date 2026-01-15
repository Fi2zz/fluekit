<template>
  <div class="flue-circular-progress-indicator" :style="containerStyle">
    <svg viewBox="0 0 40 40" :style="svgStyle">
      <circle
        class="flue-circular-progress-track"
        cx="20"
        cy="20"
        :r="radius"
        fill="none"
        :stroke="backgroundColor?.toString() || 'transparent'"
        :stroke-width="strokeWidth"
      />
      <circle
        class="flue-circular-progress-value"
        cx="20"
        cy="20"
        :r="radius"
        fill="none"
        :stroke="color.toString()"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        :style="circleStyle"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Colors } from "./Colors";
import { Color } from "./Color";

interface Props {
  /**
   * The value of the progress indicator, from 0.0 to 1.0.
   * If null, the progress indicator is indeterminate.
   */
  value?: number | null;
  /**
   * The progress indicator's color.
   */
  color?: string | Color;
  /**
   * The background color of the progress indicator track.
   */
  backgroundColor?: string | Color;
  /**
   * The width of the line used to draw the circle.
   * Default: 4.0
   */
  strokeWidth?: number;
  /**
   * The size of the progress indicator.
   * Default: 36.0
   */
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  color: () => Colors.blue,
  strokeWidth: 4,
  size: 36,
});

const radius = 18; // 20 - strokeWidth/2 roughly, kept constant for viewBox 0 0 40 40
const circumference = 2 * Math.PI * radius;

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  display: "inline-block",
}));

const svgStyle = computed<CSSProperties>(() => {
  if (props.value === null) {
    return {
      animation: "flue-circular-rotate 1.4s linear infinite",
      transformOrigin: "center center",
      width: "100%",
      height: "100%",
    };
  }
  return {
    transform: "rotate(-90deg)", // Start from top
    width: "100%",
    height: "100%",
  };
});

const dashArray = computed(() => `${circumference} ${circumference}`);

const dashOffset = computed(() => {
  if (props.value === null) {
    return 0; // Handled by animation
  }
  const percentage = Math.min(Math.max(props.value || 0, 0), 1);
  return circumference - percentage * circumference;
});

const circleStyle = computed<CSSProperties>(() => {
  if (props.value === null) {
    return {
      animation: "flue-circular-dash 1.4s ease-in-out infinite",
    };
  }
  return {
    transition: "stroke-dashoffset 0.3s linear",
  };
});
</script>

<style scoped>
@keyframes flue-circular-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes flue-circular-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
