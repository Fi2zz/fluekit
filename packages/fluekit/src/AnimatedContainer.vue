<template>
  <Container v-bind="$props"> <slot></slot> </Container>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
import { computed } from "vue";
import Container from "./Container.vue";
import { provideTransiationStyle } from "./Animated";
import { ContainerProps } from "./ContainerProps";
interface Props extends ContainerProps {
  duration?: number;
  curve?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  curve: "linear",
});

const transition = computed(() => ({ transition: `all ${props.duration}ms ${props.curve}` }));
provideTransiationStyle(transition);
</script>
