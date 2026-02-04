import { computed, defineComponent, h } from "vue";
import { provideTransiationStyle } from "./Animated.ts";

import { StyleProvider } from "./StyleProvider";
import { injectTransition } from "./Animated";
export const Opacity = defineComponent({
  name: "Opacity",
  inheritAttrs: false,
  props: {
    /**
     * 透明度值，范围 0.0 到 1.0
     * 0.0 表示完全透明（不可见）
     * 1.0 表示完全不透明（完全可见）
     * @default 1.0
     */
    opacity: {
      type: Number,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const transition = injectTransition();
    // 限制 opacity 在 0-1 之间
    const style = computed(() => {
      if (typeof props.opacity == "undefined") return {};
      const opacity = Math.max(0, Math.min(1, props.opacity));
      return { opacity, ...transition.value };
    });
    return () => h(StyleProvider, { style: style.value }, slots);
  },
});

export const AnimatedOpacity = defineComponent({
  name: "AnimatedOpacity",
  inheritAttrs: false,
  props: {
    opacity: { type: Number, required: true },
    duration: { type: Number, default: 300 },
    curve: { type: String, default: "linear" },
  },
  setup(props, { slots }) {
    const style = computed(() => {
      const transition = `opacity ${props.duration}ms ${props.curve}`;
      return { transition };
    });
    provideTransiationStyle(style);
    return () => {
      return h(Opacity, { opacity: props.opacity }, slots);
    };
  },
});
