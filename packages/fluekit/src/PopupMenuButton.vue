<template>
  <Stack>
    <IconButton :icon="icon" :color="iconColor" :iconSize="iconSize" @pressed="toggleMenu" />
    <Overlay
      :visible="isOpen"
      :color="'transparent'"
      :zIndex="999"
      @tap="closeMenu"
      position="fixed"
    />
    <transition :css="false" @enter="onEnter" @leave="onLeave">
      <div :style="menuStyle" v-if="isOpen">
        <Container :constraints="constraints" :decoration="menuDecoration">
          <Column>
            <slot :close="closeMenu" />
          </Column>
        </Container>
      </div>
    </transition>
  </Stack>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { BorderRadius } from "./BorderRadius";
import { BoxConstraints } from "./BoxConstraints";
import { BoxDecoration } from "./BoxDecoration";
import { BoxShadow } from "./BoxShadow";
import { Color } from "./Color";
import { Colors } from "./Colors";
import Column from "./Column.vue";
import Container from "./Container.vue";
import { EdgeInsets, marginToStyle } from "./EdgeInsets";
import IconButton from "./IconButton.vue";
import { Icons } from "./Icons";
import Overlay from "./Overlay.vue";
import { Offset } from "./Offset";
import Stack from "./Stack.vue";
defineOptions({ inheritAttrs: false });
interface Props {
  icon?: any;
  iconSize?: number;
  iconColor?: string | Color;
  color?: string | Color;
  elevation?: number;
  offset?: Offset; // { x: number; y: number };
  variant?: "material" | "ios";
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 24,
  elevation: 8,
  color: () => Colors.white,
  offset: () => Offset(0, 0),
  variant: "material",
});

const isOpen = ref(false);
const icon = computed(() => {
  if (props.icon) return props.icon;
  return props.variant === "ios" ? Icons.moreHorizontal : Icons.moreVert;
});
const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);

const isIos = computed(() => props.variant === "ios");

const menuDecoration = computed(() => {
  if (isIos.value) {
    return BoxDecoration({
      color: "rgba(255, 255, 255, 0.8)",
      borderRadius: BorderRadius.circular(12),
      boxShadow: [BoxShadow({ color: "rgba(0,0,0,0.15)", blurRadius: 20, offset: Offset(0, 4) })],
    });
  }
  return BoxDecoration({
    color: props.color,
    borderRadius: BorderRadius.circular(4),
    boxShadow: [
      BoxShadow({
        color: "rgba(0,0,0,0.2)",
        blurRadius: 5,
        offset: Offset(0, 5),
        spreadRadius: -1,
      }),
      BoxShadow({
        color: "rgba(0,0,0,0.14)",
        blurRadius: 10,
        offset: Offset(0, 6),
        spreadRadius: 1,
      }),
    ],
  });
});

const margin = computed(() => {
  return EdgeInsets({
    top: props.offset.y,
    right: props.offset.x,
  });
});

const constraints = BoxConstraints({
  minWidth: isIos.value ? 150 : 112,
});

const menuStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "absolute",
    top: "100%",
    right: "0",
    zIndex: 1000,
  };

  Object.assign(style, marginToStyle(margin.value));
  // if (isIos.value) {
  //   style.backdropFilter = "blur(20px)";
  //   // @ts-expect-error backdropFilter 不是标准属性，需要类型断言
  //   style.webkitBackdropFilter = "blur(20px)";
  // }

  return style;
});

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.transformOrigin = "top right";

  const keyframes = isIos.value
    ? [
        { opacity: 0, transform: "scale(0.8) translateY(-10px)" },
        { opacity: 1, transform: "scale(1) translateY(0)" },
      ]
    : [
        { opacity: 0, transform: "scale(0.9)" },
        { opacity: 1, transform: "scale(1)" },
      ];

  const options: KeyframeAnimationOptions = {
    duration: isIos.value ? 300 : 200,
    easing: isIos.value ? "cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "ease",
  };

  element.animate(keyframes, options).onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.transformOrigin = "top right";

  const keyframes = isIos.value
    ? [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.9)" },
      ]
    : [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.9)" },
      ];

  const options: KeyframeAnimationOptions = {
    duration: 150,
    easing: "ease-in",
  };

  element.animate(keyframes, options).onfinish = done;
};
</script>
