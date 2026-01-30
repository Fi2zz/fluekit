<template>
  <SizedBox
    :width="vertical ? thickness : indent + endIndent"
    :height="vertical ? indent + endIndent : thickness"
  >
    <Container
      :width="vertical ? thickness : undefined"
      :height="vertical ? undefined : thickness"
      :margin="margin"
      :color="color"
    />
  </SizedBox>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SizedBox from "./SizedBox.vue";
import Container from "./Container.vue";
import { EdgeInsets } from "./EdgeInsets";
import { Color } from "./Color";

interface Props {
  thickness?: number; // Thickness of the line
  indent?: number; // Empty space before the line
  endIndent?: number; // Empty space after the line
  color?: string | Color; // Color of the line
  vertical?: boolean; // If true, draws a vertical line (VerticalDivider)
}

const props = withDefaults(defineProps<Props>(), {
  thickness: 1, // Flutter default is 0 or 1 depending on theme, using 1 here
  indent: 0,
  endIndent: 0,
  color: "#e0e0e0", // Material light theme divider color approximation
  vertical: false,
});

const margin = computed(() => {
  if (props.vertical) return EdgeInsets.only({ top: props.indent, bottom: props.endIndent });
  return EdgeInsets.only({ left: props.indent, right: props.endIndent });
});
</script>
