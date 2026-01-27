<template>
  <div :style="wrapperStyle">
    <Container
      :height="44"
      width="100%"
      :color="backgroundColor"
      :decoration="decoration"
      :padding="padding"
    >
      <Stack fit="expand" alignment="center">
        <!-- Leading -->
        <Positioned :left="0" top="0" bottom="0">
          <Row cross-axis-alignment="center" expanded>
            <div v-if="$slots.leading">
              <slot name="leading" />
            </div>
          </Row>
        </Positioned>

        <!-- Middle (Title) -->
        <div :style="middleContainerStyle">
          <slot name="middle">
            <Text
              v-if="middle"
              :style="middleStyle"
              :max-lines="1"
              :overflow="TextOverflow.ellipsis"
            >
              {{ middle }}
            </Text>
          </slot>
        </div>

        <!-- Trailing -->
        <Positioned :right="0" top="0" bottom="0">
          <Row cross-axis-alignment="center" expanded>
            <div v-if="$slots.trailing">
              <slot name="trailing" />
            </div>
          </Row>
        </Positioned>
      </Stack>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Stack from "./Stack.vue";
import Positioned from "./Positioned.vue";
import Text from "./Text.vue";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { Border, Borders } from "./Border";
import { TextStyle, FontWeight, TextOverflow } from "./TextStyle";
import { Color } from "./Color";

export interface CupertinoNavigationBarProps {
  middle?: string;
  backgroundColor?: string | Color;
  border?: Borders | null;
  padding?: EdgeInsets;
}

const props = withDefaults(defineProps<CupertinoNavigationBarProps>(), {
  backgroundColor: "rgba(249, 249, 249, 0.94)", // Standard iOS translucent bar color
  border: undefined, // Will default to standard border in decoration computed
});

const decoration = computed(() => {
  return BoxDecoration({
    border:
      props.border !== null
        ? props.border ||
          Border.only({
            bottom: {
              color: "rgba(0, 0, 0, 0.3)",
              width: 0.5,
              style: "solid",
            },
          })
        : undefined,
  });
});

const padding = computed(() => {
  return props.padding || EdgeInsets.symmetric({ horizontal: 16 });
});

const middleStyle = TextStyle({
  fontSize: 17,
  fontWeight: FontWeight.w600,
  color: "#000000",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
});

const wrapperStyle = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  zIndex: 100,
  width: "100%",
};

const middleContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "60%",
};
</script>
