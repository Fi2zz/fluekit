<template>
  <div v-if="visible" class="dialog-overlay" @click.self="barrierDismissible ? close() : null">
    <Container
      :margin="EdgeInsets.all(40)"
      :padding="EdgeInsets.all(24)"
      :decoration="decoration"
      :constraints="BoxConstraints({ maxWidth: 400 })"
    >
      <Column main-axis-size="min" cross-axis-alignment="start">
        <Container :margin="EdgeInsets.only({ bottom: 16 })">
          <Text v-if="title" :style="{ fontSize: 20, fontWeight: FontWeight.bold }">
            {{ title }}
          </Text>
        </Container>

        <Container :margin="EdgeInsets.only({ bottom: 24 })" class="dialog-content">
          <Text v-if="content" :style="{ fontSize: 16, color: 'rgba(0,0,0,0.6)' }">
            {{ content }}
          </Text>
          <slot />
        </Container>

        <Row main-axis-alignment="end" :gap="8">
          <slot name="actions" />
        </Row>
      </Column>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Column from "./Column.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import { FontWeight } from "./TextStyle";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxConstraints } from "./BoxConstraints";

interface Props {
  visible: boolean;
  title?: string;
  content?: string;
  barrierDismissible?: boolean;
}

withDefaults(defineProps<Props>(), {
  visible: false,
  barrierDismissible: true,
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
    color: "white",
    borderRadius: BorderRadius.circular(4),
    boxShadow: [
      {
        color: "rgba(0,0,0,0.2)",
        blurRadius: 24,
        offset: { x: 0, y: 11 },
      },
    ],
  });
});
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
