<template>
  <GestureDetector
    :behavior="behavior"
    @tap="handleTap"
    @long-press="handleLongPress"
    @tap-down="handleTapDown"
    @tap-up="handleTapUp"
    @tap-cancel="handleTapCancel"
  >
    <button class="fluekit-button" :style="computedStyle" :disabled="disabled" v-bind="safeAttrs">
      <slot>{{ props.text }}</slot>
    </button>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { BorderRadius } from "./BorderRadius";
import { ButtonStyle, buttonStyleToStyle } from "./ButtonStyle";
import { Color, resolveColor } from "./Color";
import { EdgeInsets } from "./EdgeInsets";
import GestureDetector from "./GestureDetector.vue";
import { useStyles } from "./StyleProvider";
import { useGestureStyle, type Behavior } from "./useGesture";
import { useSafeAttrs } from "./useSafeAttrs";

defineOptions({ inheritAttrs: false });

interface Props {
  // 交互属性
  disabled?: boolean;
  behavior?: Behavior;
  text?: string;
  // 样式属性
  style?: ButtonStyle;
  // iOS 风格属性
  variant?: "ios" | "raw"; // 默认为 raw (无样式)
  color?: string | Color; // 背景色快捷方式 (仅对 variant='ios' 生效或作为默认背景)
  disabledColor?: string | Color;
  pressedOpacity?: number;
  padding?: EdgeInsets;
  borderRadius?: BorderRadius;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  behavior: "opaque",
  pressedOpacity: 0.4,
  disabledColor: "rgba(0, 0, 0, 0.2)",
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
  (e: "tap-down", payload: any): void;
  (e: "tap-up", payload: any): void;
  (e: "tap-cancel", payload: any): void;
}>();
const _styles = useStyles();
const safeAttrs = useSafeAttrs();
const isPressed = ref(false);
const gestureStyle = useGestureStyle(props.behavior);

// 样式计算逻辑
const computedStyle = computed(() => {
  const css: CSSProperties = { position: "relative" };
  // 1. 基础样式 (来自 variant)
  let variantStyle: ButtonStyle = {};
  if (props.variant === "ios") {
    variantStyle = ButtonStyle({
      padding: props.padding || EdgeInsets.symmetric({ vertical: 14, horizontal: 16 }),
      shape: props.borderRadius || BorderRadius.all(8),
      backgroundColor: props.disabled ? props.disabledColor : props.color || "transparent",
      opacity: isPressed.value ? props.pressedOpacity : 1.0,
    });
  }

  Object.assign(css, _styles.value);
  Object.assign(css, buttonStyleToStyle(variantStyle));
  Object.assign(css, buttonStyleToStyle(props.style));
  Object.assign(css, gestureStyle);
  if (props.disabled) {
    css.pointerEvents = "none";
    css.cursor = "default";
    if (props.color || props.disabledColor) {
      css.backgroundColor = resolveColor(props.disabledColor || props.color);
    }
  }
  if (isPressed.value) css.opacity = props.pressedOpacity;
  return css;
});

function withDisabled(handler: (e: unknown) => void) {
  return (e: unknown) => {
    if (props.disabled) return;
    handler(e);
  };
}
// 事件处理
const handleTapDown = withDisabled((e: any) => {
  isPressed.value = true;
  emit("tap-down", e);
});
const handleTapUp = (e: any) => {
  isPressed.value = false;
  emit("tap-up", e);
};

const handleTapCancel = (e: any) => {
  isPressed.value = false;
  emit("tap-cancel", e);
};
const handleTap = withDisabled(() => emit("pressed"));
const handleLongPress = withDisabled(() => emit("long-press"));
</script>

<style scoped>
.fluekit-button {
  appearance: none;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-align: inherit;
  box-sizing: border-box;
  /* 确保 padding 包含在 width/height 内 */
}

.fluekit-button:disabled {
  cursor: default;
}
</style>
