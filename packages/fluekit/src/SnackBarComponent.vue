<template>
  <div class="snackbar-overlay">
    <Container
      :margin="EdgeInsets.all(8)"
      :padding="EdgeInsets.symmetric({ horizontal: 16, vertical: 14 })"
      :decoration="decoration"
      :width="'100%'"
      :constraints="BoxConstraints({ maxWidth: 600 })"
    >
      <Row main-axis-alignment="spaceBetween" cross-axis-alignment="center">
        <Text :style="{ color: 'white', fontSize: 14 }">{{ content }}</Text>
        <GestureDetector v-if="actionLabel" @tap="handleAction">
          <Container :margin="EdgeInsets.only({ left: 16 })">
            <Text
              :style="{
                color: '#2196F3',
                fontSize: 14,
                fontWeight: FontWeight.bold,
              }"
            >
              {{ actionLabel.toUpperCase() }}
            </Text>
          </Container>
        </GestureDetector>
      </Row>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import Container from "./Container.vue";
import { FontWeight } from "./TextStyle";
import Row from "./Row.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxConstraints } from "./BoxConstraints";

interface Props {
  content: string;
  actionLabel?: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 4000,
});

const emit = defineEmits<{
  (e: "action"): void;
  (e: "close"): void;
}>();

const handleAction = () => {
  emit("action");
  emit("close");
};

onMounted(() => {
  setTimeout(() => {
    emit("close");
  }, props.duration);
});

const decoration = computed(() => {
  return BoxDecoration({
    color: "#323232",
    borderRadius: BorderRadius.circular(4),
    boxShadow: [
      {
        color: "rgba(0,0,0,0.2)",
        blurRadius: 6,
        offset: { x: 0, y: 2 },
      },
    ],
  });
});
</script>

<style scoped>
.snackbar-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 9999;
  pointer-events: none;
}
.snackbar-overlay > * {
  pointer-events: auto;
}
</style>
