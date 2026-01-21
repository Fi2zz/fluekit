<template>
  <GestureDetector @tap="handleClick">
    <Row mainAxisSize="min">
      <Container :padding="padding" :decoration="decoration">
        <Row mainAxisSize="min" crossAxisAlignment="center" :gap="8">
          <div v-if="avatar || $slots.avatar" class="fluekit-chip-avatar">
            <slot name="avatar">
              <component :is="avatar" v-if="avatar" />
            </slot>
          </div>

          <Text :style="labelStyle">{{ label }}</Text>
          <div v-if="deletable" class="fluekit-chip-delete-icon" @click.stop="onDeleted">
            <slot name="deleteIcon">
              <Icon :icon="Icons.cancel" :size="18" />
            </slot>
          </div>
        </Row>
      </Container>
    </Row>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration } from "./BoxDecoration";
import { Color } from "./Color";
import Container from "./Container.vue";
import { EdgeInsets } from "./EdgeInsets";
import GestureDetector from "./GestureDetector.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import { TextStyle } from "./TextStyle";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";
defineOptions({ inheritAttrs: false });
interface Props {
  label: string;
  avatar?: Component;
  backgroundColor?: string | Color;
  labelColor?: string | Color;
  deletable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: "#E0E0E0", // Colors.grey[300] approx
  labelColor: "rgba(0, 0, 0, 0.87)",
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "delete"): void;
}>();

const onDeleted = () => {
  if (props.deletable) emit("delete");
};

const handleClick = () => emit("pressed");
const padding = computed(() => {
  return EdgeInsets.fromLTRB(props.avatar ? 4 : 12, 4, props.deletable ? 8 : 12, 4);
});
const decoration = computed(() => {
  return BoxDecoration({
    borderRadius: BorderRadius.circular(16),
    color: props.backgroundColor,
  });
});

const labelStyle = computed(() => {
  return TextStyle({
    color: props.labelColor,
    fontSize: 14,
  });
});
</script>

<style scoped>
/* Chip styles moved to Container or handled by GestureDetector logic if needed */

.fluekit-chip-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
