<template>
  <Transition :name="transition">
    <Fixed
      v-if="visible"
      :z-index="zIndex"
      :top="0"
      :left="0"
      :right="0"
      :bottom="0"
      class="fluekit-modal"
    >
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
</script>

<style>
.fluekit-modal-fade-enter-active,
.fluekit-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.fluekit-modal-fade-enter-from,
.fluekit-modal-fade-leave-to {
  opacity: 0;
}
</style>
