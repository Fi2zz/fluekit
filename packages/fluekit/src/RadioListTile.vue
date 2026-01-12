<template>
  <ListTile
    @tap="handleTap"
    :title="title"
    :subtitle="subtitle"
    :content-padding="contentPadding"
    :tile-color="tileColor"
    :selected="selected"
    :selected-color="selectedColor"
    :enabled="enabled"
    :dense="dense"
  >
    <template #leading>
      <Radio
        v-if="controlAffinity === 'leading'"
        :value="value"
        :group-value="groupValue"
        :active-color="activeColor"
        :fill-color="fillColor"
        :hide-icon="hideIcon"
        @click.stop
      />
      <slot v-else name="secondary">
        <component :is="secondary" v-if="secondary" />
      </slot>
    </template>

    <template #title>
      <slot name="title">
        <Text v-if="title">{{ title }}</Text>
      </slot>
    </template>

    <template #subtitle>
      <slot name="subtitle">
        <Text v-if="subtitle">{{ subtitle }}</Text>
      </slot>
    </template>

    <template #trailing>
      <Radio
        v-if="controlAffinity === 'trailing'"
        :value="value"
        :group-value="groupValue"
        :active-color="activeColor"
        :fill-color="fillColor"
        :hide-icon="hideIcon"
        @click.stop
      />
      <slot v-else name="secondary">
        <component :is="secondary" v-if="secondary" />
      </slot>
    </template>
  </ListTile>
</template>

<script setup lang="ts" generic="T">
import { computed } from "vue";
import ListTile from "./ListTile.vue";
import Radio from "./Radio.vue";
import Text from "./Text.vue";
import { EdgeInsets } from "./EdgeInsets";

export interface RadioListTileProps<T> {
  value: T;
  groupValue: T;
  onChanged?: (value: T) => void;
  activeColor?: string;
  fillColor?: string;
  title?: string;
  subtitle?: string;
  secondary?: any; // Component to display on the opposite side
  controlAffinity?: "leading" | "trailing";
  contentPadding?: EdgeInsets;
  tileColor?: string;
  selected?: boolean;
  selectedColor?: string;
  enabled?: boolean;
  dense?: boolean;
  hideIcon?: boolean;
}

const props = withDefaults(defineProps<RadioListTileProps<T>>(), {
  controlAffinity: "leading",
  enabled: true,
  dense: false,
  hideIcon: false,
});

const emit = defineEmits<{
  (e: "update:groupValue", value: T): void;
  (e: "change", value: T): void;
}>();

const handleTap = () => {
  if (!props.enabled) return;
  if (props.value === props.groupValue) return;

  if (props.onChanged) {
    props.onChanged(props.value);
  }
  emit("update:groupValue", props.value);
  emit("change", props.value);
};
</script>
