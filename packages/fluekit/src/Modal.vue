<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <Fixed v-if="visible" :z-index="zIndex" v-bind="positioning">
      <Container width="100%" height="100%">
        <slot></slot>
      </Container>
    </Fixed>
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
import { computed, watch } from "vue";
import { Alignment } from "./Alignment";
import Container from "./Container.vue";
import Fixed from "./Fixed.vue";
import Overlay from "./Overlay.vue";
import { useZIndex } from "./usePosition";
import { isBrowser } from "./device";
defineOptions({ inheritAttrs: false });
interface ModalProps {
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
const emit = defineEmits<{ (e: "close"): void }>();
const close = () => {
  visible.value = false;
  emit("close");
};

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
const positioning = computed(() => {
  switch (props.alignment) {
    case Alignment.topLeft:
      return { top: "0", left: "0" };
    case Alignment.centerLeft:
      return { top: "50%", left: "0", transform: "translate(0%,-50%)" };
    case Alignment.bottomLeft:
      return { bottom: "0%", left: "0%" };
    case Alignment.topCenter:
      return { top: "0%", left: "50%", transform: "translate(-50%,0%)" };
    case Alignment.bottomCenter:
      return { bottom: "0%", left: "50%", transform: "translate(-50%,0%)" };
    case Alignment.center:
      // case Alignment.bottomCenter:
      return { top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
    case Alignment.topRight:
      return { top: "0", right: "0" };
    case Alignment.centerRight:
      return { top: "50%", right: "0", transform: "translate(0%,-50%)" };
    case Alignment.bottomRight:
      return { bottom: "0%", right: "0%" };
    default:
      return { top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
  }
});

const onBarrierDismiss = () => {
  if (!props.barrierDismissible) return;
  close();
};
const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    easing: "ease",
  });
  animation.onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 300,
    easing: "ease",
  });
  animation.onfinish = done;
};
</script>
