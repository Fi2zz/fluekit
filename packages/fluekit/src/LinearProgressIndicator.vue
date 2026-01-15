<template>
  <div class="flue-linear-progress-indicator" :style="containerStyle">
    <div class="flue-linear-progress-bar" :style="barStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Colors } from "./Colors";
import { Color } from "./Color";
import { BorderRadius, borderRadiusToStyle, isBorderRadius } from "./BorderRadius";

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
   * The background color of the progress indicator.
   */
  backgroundColor?: string | Color;
  /**
   * The height of the progress indicator.
   * Default: 4.0
   */
  minHeight?: number;
  /**
   * The border radius of the progress indicator.
   */
  borderRadius?: number | BorderRadius;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  color: () => Colors.blue,
  backgroundColor: () => Colors.blue.withOpacity(0.2),
  minHeight: 4,
});

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${props.minHeight}px`,
    backgroundColor: props.backgroundColor.toString(),
    overflow: "hidden",
    position: "relative",
    width: "100%",
  };

  if (props.borderRadius) {
    if (typeof props.borderRadius === "number") {
      Object.assign(style, borderRadiusToStyle(BorderRadius.circular(props.borderRadius)));
    } else if (isBorderRadius(props.borderRadius)) {
      Object.assign(style, borderRadiusToStyle(props.borderRadius));
    }
  }

  return style;
});

const barStyle = computed<CSSProperties>(() => {
  const isIndeterminate = props.value === null;
  const colorStr = props.color.toString();

  if (!isIndeterminate) {
    // Determinate
    const percentage = Math.min(Math.max((props.value || 0) * 100, 0), 100);
    return {
      backgroundColor: colorStr,
      width: `${percentage}%`,
      height: "100%",
      transition: "width 0.2s linear",
    };
  } else {
    // Indeterminate
    return {
      backgroundColor: colorStr,
      height: "100%",
      width: "100%", // Animation handles visual width
      animation: "flue-linear-indeterminate 1.8s infinite linear",
      transformOrigin: "0% 50%",
    };
  }
});
</script>

<style scoped>
.flue-linear-progress-indicator {
  border-radius: 0; /* Material design is rectangular usually, but could be rounded */
}

@keyframes flue-linear-indeterminate {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
