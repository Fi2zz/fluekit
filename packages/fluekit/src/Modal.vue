<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <Fixed v-if="visible" :z-index="zIndex" :top="0" :left="0" :right="0" :bottom="0">
      <Container width="100%" height="100%" :alignment="alignment">
        <slot />
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
import { Alignment } from "./Alignment";
import Container from "./Container.vue";
import Fixed from "./Fixed.vue";

import Overlay from "./Overlay.vue";
import { useZIndex } from "./usePosition";
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
