<template>
  <GestureDetector @tap="toggle">
    <Container :width="36" :height="20" :padding="EdgeInsets.all(2)" :decoration="trackDecoration">
      <AnimatedContainer
        :duration="200"
        :width="16"
        :height="16"
        :margin="thumbMargin"
        :decoration="thumbDecoration"
      />
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import AnimatedContainer from "./AnimatedContainer.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { EdgeInsets } from "./EdgeInsets";

interface Props {
  value: boolean;
  onChanged?: (value: boolean) => void;
  activeColor?: string;
  activeTrackColor?: string;
  inactiveThumbColor?: string;
  inactiveTrackColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: "#2196F3",
  activeTrackColor: "#BBDEFB",
  inactiveThumbColor: "#FAFAFA",
  inactiveTrackColor: "#9E9E9E",
});

const emit = defineEmits<{
  (e: "update:value", value: boolean): void;
}>();

const toggle = () => {
  if (props.onChanged) {
    props.onChanged(!props.value);
  }
  emit("update:value", !props.value);
};

const trackDecoration = computed(() => {
  return BoxDecoration({
    color: props.value ? props.activeTrackColor : props.inactiveTrackColor,
    borderRadius: BorderRadius.circular(10),
  });
});

const thumbDecoration = computed(() => {
  return BoxDecoration({
    color: props.value ? props.activeColor : props.inactiveThumbColor,
    shape: BoxShape.circle,
    boxShadow: [
      {
        color: "rgba(0,0,0,0.2)",
        blurRadius: 1,
        offset: { x: 0, y: 1 },
      },
    ],
  });
});

const thumbMargin = computed(() => {
  // Simple approximation of sliding
  return EdgeInsets.only({ left: props.value ? 16 : 0 });
});
</script>
