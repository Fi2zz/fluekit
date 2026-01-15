<template>
  <div :style="style" class="flue-constrained-box">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { BoxConstraints } from "./BoxConstraints";
import { boxConstraintsToStyle, isBoxConstraints } from "./BoxConstraints";
import { validateInDev } from "./utils";

interface Props {
  constraints: BoxConstraints;
}

const props = defineProps<Props>();

validateInDev(() => {
  if (props.constraints && !isBoxConstraints(props.constraints)) {
    console.warn(
      '[ConstrainedBox] constraints must be created using BoxConstraints constructor.\nExample: constraints="BoxConstraints({ minWidth: 100 })".',
    );
  }
});

const style = computed<CSSProperties>(() => {
  return {
    display: "flex", // Ensure it behaves as a container
    flexDirection: "column", // Default to column to behave like a block
    ...boxConstraintsToStyle(props.constraints),
    boxSizing: "border-box",
  };
});
</script>
