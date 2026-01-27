<template>
  <div v-if="visible" :style="overlayStyle" @click.self="barrierDismissible ? close() : null">
    <Container :decoration="decoration" width="100%" :padding="padding">
      <slot />
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
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

const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.54)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  zIndex: 9999,
};
</script>
