<template>
  <div class="flue-cupertino-activity-indicator" :style="containerStyle">
    <div
      v-for="i in 12"
      :key="i"
      class="flue-cupertino-activity-indicator-blade"
      :style="bladeStyle(i - 1)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { CupertinoColors } from "./CupertinoColors";
import { Color, resolveColor } from "./Color";

interface Props {
  /**
   * Whether the activity indicator is running its animation.
   * Default: true
   */
  animating?: boolean;
  /**
   * The color of the activity indicator.
   */
  color?: string | Color;
  /**
   * The radius of the activity indicator.
   * Default: 10.0
   */
  radius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  animating: true,
  color: () => CupertinoColors.systemGrey, // iOS default is usually gray
  radius: 10,
});

const resolvedColor = computed(() => resolveColor(props.color));

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.radius * 2}px`,
  height: `${props.radius * 2}px`,
  position: "relative",
  display: "inline-block",
}));

const bladeStyle = (index: number): CSSProperties => {
  const bladeWidth = props.radius / 3.5; // Heuristic based on radius
  const bladeHeight = props.radius / 1.2;

  return {
    position: "absolute",
    top: "0",
    left: `calc(50% - ${bladeWidth / 2}px)`,
    width: `${bladeWidth}px`,
    height: "100%",
    transform: `rotate(${index * 30}deg)`,
  };
};

/*
 * Note: CupertinoActivityIndicator in Flutter uses custom painting or a specific
 * SVG-like structure. In CSS, we can simulate the "blades" using pseudo-elements
 * or multiple divs.
 *
 * Actually, the standard iOS spinner is a set of lines arranged in a circle.
 * We can use ::before on each blade div to draw the line part.
 */
</script>

<style scoped>
.flue-cupertino-activity-indicator-blade::before {
  content: "";
  position: html;
  display: block;
  width: 100%;
  height: 25%;
  /* Blade length relative to container diameter */
  background-color: v-bind("resolvedColor");
  border-radius: 10px;
}

.flue-cupertino-activity-indicator-blade {
  opacity: 0;
  animation: flue-cupertino-fade 1s linear infinite;
}

/* Delay for each blade */
.flue-cupertino-activity-indicator-blade:nth-child(1) {
  animation-delay: -1s;
}

.flue-cupertino-activity-indicator-blade:nth-child(2) {
  animation-delay: -0.9167s;
}

.flue-cupertino-activity-indicator-blade:nth-child(3) {
  animation-delay: -0.8333s;
}

.flue-cupertino-activity-indicator-blade:nth-child(4) {
  animation-delay: -0.75s;
}

.flue-cupertino-activity-indicator-blade:nth-child(5) {
  animation-delay: -0.6667s;
}

.flue-cupertino-activity-indicator-blade:nth-child(6) {
  animation-delay: -0.5833s;
}

.flue-cupertino-activity-indicator-blade:nth-child(7) {
  animation-delay: -0.5s;
}

.flue-cupertino-activity-indicator-blade:nth-child(8) {
  animation-delay: -0.4167s;
}

.flue-cupertino-activity-indicator-blade:nth-child(9) {
  animation-delay: -0.3333s;
}

.flue-cupertino-activity-indicator-blade:nth-child(10) {
  animation-delay: -0.25s;
}

.flue-cupertino-activity-indicator-blade:nth-child(11) {
  animation-delay: -0.1667s;
}

.flue-cupertino-activity-indicator-blade:nth-child(12) {
  animation-delay: -0.0833s;
}

@keyframes flue-cupertino-fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }

  /* Fade out to partial opacity */
}
</style>
