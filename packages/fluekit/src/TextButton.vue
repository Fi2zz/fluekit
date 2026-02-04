<template>
  <Button
    :text="childText"
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
import { computed, useSlots } from "vue";
import { BorderRadius } from "./BorderRadius";
import Button from "./Button.vue";
import { ButtonStyle } from "./ButtonStyle";
import { Colors } from "./Colors";
import { EdgeInsets } from "./EdgeInsets";
import { TextStyle } from "./TextStyle";

defineOptions({ inheritAttrs: false });

interface Props {
  style?: ButtonStyle;
  disabled?: boolean;
  child?: any;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
  (e: "tap-down", payload: any): void;
  (e: "tap-up", payload: any): void;
  (e: "tap-cancel", payload: any): void;
}>();

const slots = useSlots();
const childText = computed(() => (slots.default ? undefined : props.child?.toString()));

const computedStyle = computed<ButtonStyle>(() => {
  const baseStyle = ButtonStyle({
    backgroundColor: "transparent",
    foregroundColor: props.disabled ? "rgba(0,0,0,0.38)" : Colors.blue,
    elevation: 0,
    padding: EdgeInsets.symmetric({ horizontal: 8, vertical: 8 }),
    shape: BorderRadius.all(4),
    textStyle: TextStyle({
      fontWeight: 500,
      fontSize: 14,
      color: props.disabled ? "rgba(0,0,0,0.38)" : Colors.blue,
    }),
  });

  return { ...baseStyle, ...props.style };
});
</script>
