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
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "./Button.vue";
import { ButtonStyle } from "./ButtonStyle";
import { Colors } from "./Colors";
import { BorderRadius } from "./BorderRadius";
import { EdgeInsets } from "./EdgeInsets";
import { BorderSide } from "./Border";
defineOptions({ inheritAttrs: false });
interface Props {
  style?: ButtonStyle;
  disabled?: boolean;
  child?: any;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
  (e: "tap-down", payload: any): void;
  (e: "tap-up", payload: any): void;
  (e: "tap-cancel", payload: any): void;
}>();
const computedStyle = computed<ButtonStyle>(() => {
  const baseStyle: ButtonStyle = {
    backgroundColor: "transparent",
    foregroundColor: props.disabled ? "rgba(0,0,0,0.38)" : Colors.blue,
    elevation: 0,
    padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 8 }),
    shape: BorderRadius.all(4),
    side: BorderSide({
      color: props.disabled ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.12)", // Standard outline color
      width: 1,
    }),
    textStyle: {
      fontWeight: 500,
      fontSize: 14,
      color: props.disabled ? "rgba(0,0,0,0.38)" : Colors.blue,
    },
  };
  return ButtonStyle({ ...baseStyle, ...props.style });
});
</script>
