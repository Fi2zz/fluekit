<template>
  <GestureDetector @tap="onTap" @long-press="onLongPress">
    <Container
      :color="selected ? selectedColor : tileColor || 'transparent'"
      :padding="contentPadding"
    >
      <Row cross-axis-alignment="center" :gap="16">
        <!-- Leading -->
        <slot name="leading">
          <component :is="leading" v-if="leading" />
        </slot>

        <!-- Title & Subtitle -->
        <Expanded :flex="1">
          <Column cross-axis-alignment="start" :gap="4">
            <slot name="title">
              <Text v-if="title" :data="title" :style="titleStyle" />
            </slot>
            <slot name="subtitle">
              <Text v-if="subtitle" :data="subtitle" :style="subtitleStyle" />
            </slot>
          </Column>
        </Expanded>
        <!-- Trailing -->
        <slot name="trailing">
          <component :is="trailing" v-if="trailing" />
        </slot>
      </Row>
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Column from "./Column.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import { EdgeInsets } from "./EdgeInsets";
import { TextStyle, FontWeight } from "./TextStyle";
import { Color } from "./Color";
import Expanded from "./Expanded.vue";

const emit = defineEmits<{
  (e: "tap"): void;
  (e: "long-press"): void;
}>();

const onTap = () => {
  if (props.enabled) {
    emit("tap");
  }
};

const onLongPress = () => {
  if (props.enabled) {
    emit("long-press");
  }
};

interface Props {
  // Content
  leading?: any;
  title?: string;
  subtitle?: string;
  trailing?: any;

  // Interaction
  enabled?: boolean;
  selected?: boolean;

  // Styling
  tileColor?: string | Color;
  selectedColor?: string | Color;
  iconColor?: string | Color;
  textColor?: string | Color;
  contentPadding?: EdgeInsets;
  dense?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  selected: false,
  selectedColor: "rgba(33, 150, 243, 0.12)", // Default Material selected color
  dense: false,
});

const titleStyle = computed(() => {
  return TextStyle({
    fontSize: props.dense ? 13 : 16,
    color: props.textColor || (props.enabled ? "rgba(0,0,0,0.87)" : "rgba(0,0,0,0.38)"),
    fontWeight: props.selected ? FontWeight.w600 : FontWeight.w400,
  });
});

const contentPadding = computed(() => {
  if (props.contentPadding) return props.contentPadding;
  return props.dense
    ? EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })
    : EdgeInsets.symmetric({ horizontal: 16, vertical: 12 });
});

const subtitleStyle = computed(() => {
  return TextStyle({
    fontSize: props.dense ? 12 : 14,
    color: props.textColor || (props.enabled ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.38)"),
  });
});
</script>
