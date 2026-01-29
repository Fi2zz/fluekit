<template>
  <Teleport to="body">
    <Transition :css="false" @enter="onFadeEnter" @leave="onFadeLeave">
      <div :style="dialogOverlayStyle" v-if="modelValue">
        <Transition :css="false" @enter="onScaleEnter" @leave="onScaleLeave">
          <div :style="liquidGlassDialogStyle" @click.stop v-if="modelValue">
            <div style="position: relative; z-index: 2">
              <div :style="contentStyle">
                <Text :style="titleStyle" tag="h3" v-if="title">{{ title }}</Text>
                <Text :style="messageStyle" tag="p" v-if="message" :data="message"></Text>
              </div>
              <StyleProvider :style="{ padding: '0 12px 12px' }">
                <FlexBox :direction="direction" gap="8PX">
                  <Button
                    v-for="(action, index) in actions"
                    :key="index"
                    :style="getActionButtonStyle(action)"
                    @pressed="handleAction(action, index)"
                    :text="action.title"
                  />
                </FlexBox>
              </StyleProvider>
            </div>
            <div :style="backdropStyle"></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ComputedRef, CSSProperties } from "vue";
import { defineKeyframes } from "./Animator";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration, boxDecorationToStyle } from "./BoxDecoration";
import { BlurStyle, BoxShadow } from "./BoxShadow";
import Button from "./Button.vue";
import { ButtonStyle } from "./ButtonStyle";
import { EdgeInsets, paddingToStyle } from "./EdgeInsets";
import FlexBox from "./FlexBox.vue";
import { ImageFilter } from "./ImageFilter";
import { StyleProvider } from "./StyleProvider";
import Text from "./Text.vue";
import { FontWeight, TextAlign, TextStyle } from "./TextStyle";
import { useMediaQuery } from "./useMediaQuery";
import { useZIndex } from "./usePosition";
export type LiquidGlassDialogActionStyle = "default" | "primary";
defineOptions({ inheritAttrs: false });
export interface LiquidGlassDialogAction {
  title: string;
  style?: LiquidGlassDialogActionStyle;
  keepOpen?: boolean;
  onPressed?: (action: LiquidGlassDialogAction) => Promise<void>;
  [key: string]: unknown;
}

export interface LiquidGlassDialogActionPayload {
  action: LiquidGlassDialogAction;
  index: number;
}

export interface LiquidGlassDialogExpose {
  close: () => void;
}
export interface LiquidGlassDialogProps {
  modelValue: boolean;
  title?: string;
  message?: string;
  actions: LiquidGlassDialogAction[];
}

const props = withDefaults(defineProps<LiquidGlassDialogProps>(), {
  title: "",
  message: "",
  actions: () => [],
});
const direction = computed(() => {
  if (props.actions.length == 2) return "row";
  return "column";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "action", payload: LiquidGlassDialogActionPayload): void;
  (e: "close"): void;
  (e: "afterClose"): void;
}>();
const close = (): void => {
  emit("update:modelValue", false);
  emit("close");
};

defineExpose<LiquidGlassDialogExpose>({ close });
const handleAction = async (action: LiquidGlassDialogAction, index: number) => {
  const payload: LiquidGlassDialogActionPayload = { action, index };
  if (typeof action.onPressed === "function") {
    try {
      await action.onPressed(action);
      if (!action.keepOpen) close();
      return;
    } catch (error) {}
    return;
  }
  emit("action", payload);

  if (!action.keepOpen) close();
};

const contentStyle = paddingToStyle(
  EdgeInsets.only({ top: "22PX", bottom: "20PX", left: "20PX", right: "20PX" }),
);

const mediaQuery = useMediaQuery();
const titleStyle = computed(() =>
  TextStyle({
    fontSize: "17PX",
    fontWeight: 600,
    height: `${1.35 * 17}PX`,
    letterSpacing: -0.4,
    color: mediaQuery.platformBrightness === "dark" ? "#ffffff" : "#000000",
  }),
);

const messageStyle = computed(() =>
  TextStyle({
    fontSize: "13PX",
    fontWeight: 600,
    height: `${1.35 * 13}PX`,
    letterSpacing: "-0.4PX",
    color: mediaQuery.platformBrightness === "dark" ? "#a1a1a6" : "#6b6b6b",
  }),
);

function getActionButtonStyle(action: LiquidGlassDialogAction): ButtonStyle {
  let backgroundColor;
  let textColor;
  switch (mediaQuery.platformBrightness) {
    case "light":
      textColor = action.style == "primary" ? "#ffffff" : "#000000";
      backgroundColor = action.style == "primary" ? "#007aff" : "rgba(120, 120, 128, 0.16)";
      break;
    case "dark":
      textColor = "#ffffff";
      backgroundColor = action.style == "primary" ? "#0a84ff" : "rgba(120, 120, 128, 0.24)";
      break;
  }

  const fontSize = direction.value == "row" ? 15 : 16;
  const fontWeight = action.style == "primary" ? FontWeight.w500 : FontWeight.w400;

  return ButtonStyle({
    alignment: "center",
    textAlign: TextAlign.center,
    backgroundColor: backgroundColor,
    padding: EdgeInsets.symmetric({ vertical: "12PX", horizontal: "16PX" }),
    textStyle: TextStyle({
      fontSize: fontSize + "PX",
      height: `${1.4 * fontSize}PX`,
      color: textColor,
      fontWeight,
    }),
    shape: BorderRadius.circular("100PX"),
    flex: "1 1 0%",
  });
}

const backdropStyle = computed(() => {
  const decoration = boxDecorationToStyle(
    BoxDecoration({
      boxShadow: [
        BoxShadow({
          color:
            mediaQuery.platformBrightness === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)",
          offset: { x: 0, y: 25 },
          blurRadius: 50,
          spreadRadius: -12,
        }),
        BoxShadow({
          color:
            mediaQuery.platformBrightness === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.4)",
          offset: { x: 0, y: 0 },
          blurRadius: 0,
          spreadRadius: 0.5,
          blurStyle: BlurStyle.inner,
        }),
      ],
      color:
        mediaQuery.platformBrightness === "dark"
          ? "rgba(40, 40, 42, 0.85)"
          : "rgba(245, 245, 247, 0.82)",
      backdropFilter: `${ImageFilter.blur({ sigmaY: 25 })} ${ImageFilter.saturate("180%")}`,
    }),
  );
  return Object.assign(decoration, { position: "absolute", inset: 0, zIndex: 0 });
});

defineKeyframes("liquid-glass-dialog-enter", {
  from: { transform: "scale(0.85) translateY(10px)", opacity: 0 },
  to: { opacity: 1, transform: "scale(1) translateY(0)" },
});
const dialogOverlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: useZIndex(),
  pointerEvents: "auto",
  cursor: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(3px)",
  padding: "40px 20px",
  width: "100%",
  height: "100%",
};
const liquidGlassDialogStyle: ComputedRef<CSSProperties> = computed(() => ({
  position: "relative",
  maxWidth: "400px",
  borderRadius: "32px",
  overflow: "hidden",
  width: "100%",
  animation: "liquid-glass-dialog-enter 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
}));
const onFadeEnter = (el: Element, done: () => void) => {
  const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 250,
    easing: "ease",
    fill: "both",
  });
  animation.onfinish = () => done();
};

const onFadeLeave = (el: Element, done: () => void) => {
  const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 250,
    easing: "ease",
    fill: "both",
  });
  animation.onfinish = () => {
    done();
    emit("afterClose");
  };
};

const onScaleEnter = (el: Element, done: () => void) => {
  const animation = el.animate(
    [
      { opacity: 0, transform: "scale(0.85) translateY(10px)" },
      { opacity: 1, transform: "scale(1) translateY(0)" },
    ],
    {
      duration: 350,
      easing: "cubic-bezier(0.32, 0.72, 0, 1)",
      fill: "both",
    },
  );

  animation.onfinish = () => done();
};

const onScaleLeave = (el: Element, done: () => void) => {
  const animation = el.animate(
    [
      { opacity: 1, transform: "scale(1) translateY(0)" },
      { opacity: 0, transform: "scale(0.85) translateY(10px)" },
    ],
    {
      duration: 200,
      easing: "ease-in",
      fill: "both",
    },
  );

  animation.onfinish = () => done();
};
</script>
