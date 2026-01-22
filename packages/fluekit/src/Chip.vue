<template>
  <GestureDetector @tap="handleClick">
    <Container
      :padding="padding"
      :decoration="decoration"
      :width="width"
      :height="height"
      :alignment="alignment"
    >
      <Row expanded crossAxisAlignment="center" :gap="8" mainAxisAlignment="start">
        <div v-if="avatar || $slots.avatar" class="fluekit-chip-avatar" :style="avatarStyle">
          <slot name="avatar">
            <component :is="avatar" v-if="avatar" />
          </slot>
        </div>
        <Text :style="labelStyle">{{ label }}</Text>
        <div v-if="deletable" class="fluekit-chip-delete-icon" @click.stop="onDeleted">
          <slot name="deleteIcon">
            <Icon :icon="Icons.cancel" :size="iconSize" />
          </slot>
        </div>
      </Row>
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed, useSlots, type Component } from "vue";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration } from "./BoxDecoration";
import { Color } from "./Color";
import Container from "./Container.vue";
import { EdgeInsets } from "./EdgeInsets";
import GestureDetector from "./GestureDetector.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";

import { Alignment } from "./FlexProps";
import { BoxFit, ImageProvider } from ".";
import { DecorationImage, decorationImageToStyle } from "./BoxDecoration";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";
import { px2vw } from "./px2vw";
import { TextStyle } from "./TextStyle";
import { ChilpProps, ChipEmits } from "./ChipProps";
defineOptions({ inheritAttrs: false });
const slots = useSlots();
const props = withDefaults(defineProps<ChilpProps>(), {
  backgroundColor: "#E0E0E0", // Colors.grey[300] approx
  labelColor: "rgba(0, 0, 0, 0.87)",
  size: "medium",
  labelStyle: () => ({}),
  decoration: () => ({}),
});

const emit = defineEmits<ChipEmits>();
const onDeleted = () => {
  if (props.deletable) emit("delete");
};
const handleClick = () => emit("pressed");
const padding = computed(() => {
  const horizontal = props.size === "small" ? "8px" : props.size === "large" ? "16px" : "12px";
  const vertical = props.size === "small" ? 0 : props.size === "large" ? "8px" : "4px";
  return EdgeInsets.fromLTRB(
    slots.avatar || props.avatar ? "4px" : horizontal,
    vertical,
    props.deletable ? (props.size === "small" ? "4px" : "8px") : horizontal,
    vertical,
  );
});
const decoration = computed(() => {
  return BoxDecoration({
    borderRadius: BorderRadius.circular(16),
    color: props.backgroundColor,
    ...(props.decoration ?? {}),
  });
});
const labelStyle = computed(() => {
  const fontSize = props.size === "small" ? 12 : props.size === "large" ? 16 : 14;
  return TextStyle({
    color: props.labelColor,
    fontSize,
    ...(props.labelStyle ?? {}),
  });
});

const alignment = computed(() => {
  return Alignment.center;
});

const iconSize = computed(() => {
  return props.size === "small" ? "16px" : props.size === "large" ? "20px" : "18px";
});

const avatarSize = computed(() => {
  return props.size === "small" ? "18px" : props.size === "large" ? "32px" : "24px";
});

const avatarStyle = computed(() => {
  const base = {
    width: px2vw(avatarSize.value),
    height: px2vw(avatarSize.value),
  };
  if (typeof props.avatar != "string") return base;
  const avatar = props.avatar as unknown as string;
  if (
    avatar.startsWith("/") ||
    avatar.startsWith("http://") ||
    avatar.startsWith("https://") ||
    avatar.startsWith("data:")
  ) {
    return {
      ...base,
      ...decorationImageToStyle(
        DecorationImage({
          image: ImageProvider(props.avatar as unknown as string),
          alignment: Alignment.center,
          fit: BoxFit.cover,
        }),
      ),
    };
  }
  return base;
});
</script>

<style scoped>
/* Chip styles moved to Container or handled by GestureDetector logic if needed */

.fluekit-chip-avatar {
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fluekit-chip-delete-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.54;
  margin-left: 4px;
}

.fluekit-chip-delete-icon:hover {
  opacity: 0.87;
}
</style>
