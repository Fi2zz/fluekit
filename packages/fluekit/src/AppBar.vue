<template>
  <Container :height="height" :color="backgroundColor" :decoration="decoration" :padding="padding">
    <Row cross-axis-alignment="center" :gap="0" expanded>
      <div v-if="$slots.leading" class="flue-app-bar-leading">
        <slot name="leading" />
      </div>

      <Expanded>
        <slot name="title">
          <Text v-if="title" :style="titleStyle" :max-lines="1" :overflow="TextOverflow.ellipsis">
            {{ title }}
          </Text>
        </slot>
      </Expanded>

      <div v-if="$slots.actions" class="flue-app-bar-actions">
        <Row main-axis-size="min" :gap="8">
          <slot name="actions" />
        </Row>
      </div>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Expanded from "./Expanded.vue";
import Text from "./Text.vue";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { TextStyle, FontWeight, TextOverflow } from "./TextStyle";

export interface AppBarProps {
  title?: string;
  backgroundColor?: string;
  height?: number;
  centerTitle?: boolean;
  elevation?: number;
  padding?: EdgeInsets;
}

const props = withDefaults(defineProps<AppBarProps>(), {
  backgroundColor: "#2196F3", // Default material blue
  height: 56,
  centerTitle: false,
  elevation: 4,
});

const decoration = computed(() => {
  if (props.elevation > 0) {
    return BoxDecoration({
      boxShadow: [
        {
          color: "rgba(0,0,0,0.2)",
          blurRadius: props.elevation,
          offset: { x: 0, y: 2 },
        },
      ],
    });
  }
  return undefined;
});

const padding = computed(() => {
  return props.padding || EdgeInsets.symmetric({ horizontal: 16 });
});

const titleStyle = TextStyle({
  fontSize: 20,
  fontWeight: FontWeight.w500,
  color: "white",
});
</script>

<style scoped>
.flue-app-bar-leading {
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.flue-app-bar-actions {
  margin-left: 16px;
  display: flex;
  align-items: center;
}
</style>
