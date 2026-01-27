<template>
  <Container :height="height" :decoration="decoration" :padding="padding" width="100%">
    <Row cross-axis-alignment="center" :gap="0" expanded>
      <div v-if="$slots.leading" :style="leadingStyle">
        <slot name="leading" />
      </div>
      <div v-else-if="scaffoldHasDrawer" :style="leadingStyle">
        <IconButton :icon="Icons.menu" color="blue" @pressed="scaffoldOpenDrawer" />
      </div>
      <Expanded>
        <slot name="title">
          <Text
            v-if="title"
            :data="title"
            :style="titleStyle"
            :max-lines="1"
            :overflow="TextOverflow.ellipsis"
          />
        </slot>
      </Expanded>
      <div v-if="$slots.actions" :style="actionsStyle">
        <Row main-axis-size="min" :gap="8">
          <slot name="actions" />
        </Row>
      </div>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Expanded from "./Expanded.vue";
import Text from "./Text.vue";
import IconButton from "./IconButton.vue";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { TextStyle, FontWeight, TextOverflow } from "./TextStyle";
import { Color } from "./Color";
import { Icons } from "./Icons";

export interface AppBarProps {
  title?: string;
  backgroundColor?: string | Color;
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

const scaffoldHasDrawer = inject<Ref<boolean>>("Scaffold.hasDrawer");
const scaffoldOpenDrawer = inject<() => void>("Scaffold.openDrawer");

const decoration = computed(() => {
  if (props.elevation > 0) {
    return BoxDecoration({
      color: props.backgroundColor,
      boxShadow: [
        {
          color: "rgba(0,0,0,0.2)",
          blurRadius: props.elevation,
          offset: { x: 0, y: 2 },
        },
      ],
    });
  }
  return BoxDecoration({
    color: props.backgroundColor,
  });
});

const padding = computed(() => {
  return props.padding || EdgeInsets.symmetric({ horizontal: 16 });
});
const titleStyle = TextStyle({ fontSize: 20, fontWeight: FontWeight.w500, color: "white" });

const leadingStyle = {
  marginRight: "16px",
  display: "flex",
  alignItems: "center",
};

const actionsStyle = {
  marginLeft: "16px",
  display: "flex",
  alignItems: "center",
};
</script>
