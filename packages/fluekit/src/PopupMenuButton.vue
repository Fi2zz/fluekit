<template>
  <Stack>
    <IconButton :icon="icon" :color="iconColor" :iconSize="iconSize" @pressed="toggleMenu" />

    <Overlay :visible="isOpen" :color="'transparent'" :zIndex="999" @tap="closeMenu" />

    <transition name="popup-scale">
      <Container
        v-if="isOpen"
        :margin="margin"
        :constraints="constraints"
        :decoration="menuDecoration"
        :style="menuStyle"
      >
        <Column mainAxisSize="min">
          <slot :close="closeMenu" />
        </Column>
      </Container>
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
import { EdgeInsets } from "./EdgeInsets";
import IconButton from "./IconButton.vue";
import { Icons } from "./Icons";
import Overlay from "./Overlay.vue";

import Stack from "./Stack.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  icon?: any;
  iconSize?: number;
  iconColor?: string | Color;
  color?: string | Color;
  elevation?: number;
  offset?: { x: number; y: number };
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 24,
  color: () => Colors.white,
  elevation: 8,
  offset: () => ({ x: 0, y: 0 }),
});

const isOpen = ref(false);
const icon = computed(() => props.icon ?? Icons.moreVert);
const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);

const menuDecoration = computed(() => {
  return BoxDecoration({
    color: props.color,
    borderRadius: BorderRadius.circular(4),
    boxShadow: [
      BoxShadow({
        color: "rgba(0,0,0,0.2)",
        blurRadius: 5,
        offset: { x: 0, y: 5 },
        spreadRadius: -1,
      }),
      BoxShadow({
        color: "rgba(0,0,0,0.14)",
        blurRadius: 10,
        offset: { x: 0, y: 6 },
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
  minWidth: 112,
});

const menuStyle = computed<CSSProperties>(() => {
  return {
    position: "absolute",
    top: "100%",
    right: "0",
    zIndex: 1000,
  };
});
</script>

<style scoped>
.popup-scale-enter-active,
.popup-scale-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: top right;
}

.popup-scale-enter-from,
.popup-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
