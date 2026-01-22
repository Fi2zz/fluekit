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
    <Row :mainAxisSize="MainAxisSize.min" :crossAxisAlignment="CrossAxisAlignment.center" :gap="8">
      <Icon
        v-if="iconPosition === 'left'"
        :icon="icon"
        :size="iconSize"
        :color="iconColor || computedStyle.foregroundColor"
      />
      <Text :style="textStyle" v-if="label">{{ label }}</Text>
      <Icon
        v-if="iconPosition === 'right'"
        :icon="icon"
        :size="iconSize"
        :color="iconColor || computedStyle.foregroundColor"
      />
    </Row>
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
import Row from "./Row.vue";
import Text from "./Text.vue";
import { TextStyle } from "./TextStyle";
import { MainAxisSize, CrossAxisAlignment } from "./FlexProps";

defineOptions({ inheritAttrs: false });

interface Props {
  icon: string | Component;
  label?: string;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconColor?: string | Color;
  disabled?: boolean;
  padding?: EdgeInsets;
  style?: ButtonStyle;
  textStyle?: TextStyle;
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 24,
  disabled: false,
  iconPosition: "left",
  padding: () => EdgeInsets.symmetric({ vertical: 8, horizontal: 16 }),
});

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
    foregroundColor: props.disabled ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0.54)",
    elevation: 0,
    padding: props.padding,
    shape: BorderRadius.circular(4), // Standard rounded corners for text buttons
    minimumSize: { width: 64, height: 36 },
  };
  return ButtonStyle({ ...baseStyle, ...props.style });
});
</script>
