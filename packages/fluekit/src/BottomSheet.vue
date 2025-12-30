<template>
  <div
    v-if="visible"
    class="bottom-sheet-overlay"
    @click.self="barrierDismissible ? close() : null"
  >
    <Container
      class="bottom-sheet-content"
      :decoration="decoration"
      width="100%"
      :padding="padding"
    >
      <slot />
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { EdgeInsets } from "./EdgeInsets";

interface Props {
  visible: boolean;
  barrierDismissible?: boolean;
  backgroundColor?: string;
  elevation?: number;
  shape?: BorderRadius;
  padding?: EdgeInsets;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  barrierDismissible: true,
  backgroundColor: "white",
  elevation: 8,
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
}>();

const close = () => {
  emit("update:visible", false);
  emit("close");
};

const decoration = computed(() => {
  return BoxDecoration({
    color: props.backgroundColor,
    borderRadius: props.shape || BorderRadius.only({ topLeft: 16, topRight: 16 }),
    boxShadow:
      props.elevation > 0
        ? [
            {
              color: "rgba(0,0,0,0.2)",
              blurRadius: props.elevation * 2,
              offset: { x: 0, y: -2 },
            },
          ]
        : undefined,
  });
});
</script>

<style scoped>
.bottom-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
}

/* Optional: Add transition/animation here if needed */
</style>
