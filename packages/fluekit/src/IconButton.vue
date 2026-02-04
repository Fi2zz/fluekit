<template>
  <Button
    :style="computedStyle"
    :disabled="disabled"
    @pressed="emit('pressed')"
    @long-press="emit('long-press')"
    @tap-down="emit('tap-down', $event)"
    @tap-up="emit('tap-up', $event)"
    @tap-cancel="emit('tap-cancel', $event)"
  >
    <Icon :icon="icon" :size="iconSize" :color="color || computedStyle.foregroundColor" />
  </Button>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { BorderRadius } from "./BorderRadius";
import Button from "./Button.vue";
import { ButtonStyle } from "./ButtonStyle";
import { Color } from "./Color";
import { EdgeInsets } from "./EdgeInsets";
import Icon from "./Icon.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  icon: string | Component;
  iconSize?: number;
  color?: string | Color;
  disabled?: boolean;
  padding?: EdgeInsets;
  alignment?: any;
  splashRadius?: number; // Not fully implemented in Button yet, but reserved
  style?: ButtonStyle;
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 24,
  disabled: false,
  padding: () => EdgeInsets.all(8),
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
  (e: "tap-down", payload: any): void;
  (e: "tap-up", payload: any): void;
  (e: "tap-cancel", payload: any): void;
}>();

const computedStyle = computed<ButtonStyle>(() => {
  const baseStyle = ButtonStyle({
    backgroundColor: "transparent",
    foregroundColor: props.disabled ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0.54)", // Standard icon color
    elevation: 0,
    padding: props.padding,
    shape: BorderRadius.circular(100), // Circle
    minimumSize: { width: 0, height: 0 }, // Allow shrinking
  });
  return ButtonStyle({ ...baseStyle, ...props.style });
});
</script>
