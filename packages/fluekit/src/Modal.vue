<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <Fixed v-if="visible" :z-index="zIndex" :top="0" :left="0" :right="0" :bottom="0">
      <Container width="100%" height="100%" :alignment="alignment">
        <slot />
      </Container>
    </Fixed>
  </Transition>
  <Overlay :visible="visible" position="fixed" @tap="onBarrierDismiss" :z-index="zIndex - 1">
  </Overlay>
</template>

<script setup lang="ts">
import { Alignment } from "./Alignment";
import Container from "./Container.vue";
import Fixed from "./Fixed.vue";

import Overlay from "./Overlay.vue";
defineOptions({ inheritAttrs: false });

interface Props {
  visible: boolean;
  barrierDismissible?: boolean;
  barrierColor?: string;
  alignment?: Alignment;
  zIndex?: number;
  transition?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  barrierDismissible: true,
  barrierColor: "rgba(0, 0, 0, 0.5)",
  alignment: Alignment.center,
  zIndex: 1000,
  transition: "fluekit-modal-fade",
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
}>();

const close = () => {
  emit("update:visible", false);
  emit("close");
};

const onBarrierDismiss = () => {
  if (props.barrierDismissible) {
    close();
  }
};

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    easing: "ease",
  }).onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 300,
    easing: "ease",
  }).onfinish = done;
};
</script>
