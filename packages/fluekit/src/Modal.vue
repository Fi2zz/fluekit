<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div :style="coreStyle" class="modal-core" v-if="visible" @click="onCoreClick">
      <slot></slot>
    </div>
  </Transition>
  <Overlay
    :visible="visible"
    position="fixed"
    @tap="onBarrierDismiss"
    :z-index="zIndex - 1"
    :color="barrierColor"
  />
</template>

<script setup lang="ts">
import { computed, ComputedRef, CSSProperties, watch } from "vue";
import { Alignment, alignmentToFlex } from "./Alignment";
import { isBrowser } from "./device";
import Overlay from "./Overlay.vue";
import { usePositionStyle, useZIndex } from "./usePosition";
import { withFlexDirection } from "./FlexProps";
defineOptions({ inheritAttrs: false });
export interface ModalProps {
  barrierDismissible?: boolean;
  barrierColor?: string;
  alignment?: Alignment;
  zIndex?: number;
}
const visible = defineModel("visible", { type: Boolean, default: false });
const props = withDefaults(defineProps<ModalProps>(), {
  barrierDismissible: true,
  barrierColor: "rgba(0, 0, 0, 0.5)",
  alignment: Alignment.center,
  zIndex: () => useZIndex(),
});
const emit = defineEmits<{ (e: "close"): void; (e: "afterClose"): void }>();
const close = () => {
  visible.value = false;
  emit("close");
};

const style = usePositionStyle(
  computed(() => ({
    inset: "0",
    zIndex: props.zIndex,
    position: "fixed",
    width: "100%",
    height: "100%",
  })),
);

const coreStyle: ComputedRef<CSSProperties> = computed(() =>
  withFlexDirection("column", {
    ...style.value,
    ...alignmentToFlex(props.alignment, "column"),
  }),
);

function toggleBodyScroll(enabled: boolean) {
  if (!isBrowser) return;
  if (enabled) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
watch(
  () => visible.value,
  (newValue) => toggleBodyScroll(newValue),
);

const onBarrierDismiss = () => {
  if (!props.barrierDismissible) return;
  close();
};
const onCoreClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    onBarrierDismiss();
  }
};

const getTransform = (alignment: Alignment) => {
  switch (alignment) {
    case Alignment.topCenter:
      return "translateY(-100%)";
    case Alignment.bottomCenter:
      return "translateY(100%)";
    case Alignment.topLeft:
      return "translate(-100%, -100%)";
    case Alignment.topRight:
      return "translate(100%, -100%)";
    case Alignment.bottomLeft:
      return "translate(-100%, 100%)";
    case Alignment.bottomRight:
      return "translate(100%, 100%)";
    case Alignment.centerLeft:
      return "translateX(-100%)";
    case Alignment.centerRight:
      return "translateX(100%)";
    case Alignment.center:
    default:
      return "scale(0)";
  }
};

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const transform = getTransform(props.alignment);
  const animation = element.animate(
    [
      { opacity: 0, transform },
      { opacity: 1, transform: "none" },
    ],
    {
      duration: 300,
      easing: "ease",
    },
  );
  animation.onfinish = () => {
    done();
  };
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const transform = getTransform(props.alignment);
  const animation = element.animate(
    [
      { opacity: 1, transform: "none" },
      { opacity: 0, transform },
    ],
    {
      duration: 300,
      easing: "ease",
    },
  );
  animation.onfinish = () => {
    done();
    emit("afterClose");
  };
};
</script>
