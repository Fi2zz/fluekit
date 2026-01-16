<template>
  <div class="flue-cupertino-navigation-bar">
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
            <div v-if="$slots.leading" class="flue-nav-bar-leading">
              <slot name="leading" />
            </div>
          </Row>
        </Positioned>

        <!-- Middle (Title) -->
        <div class="flue-nav-bar-middle">
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
            <div v-if="$slots.trailing" class="flue-nav-bar-trailing">
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
</script>

<style scoped>
.flue-cupertino-navigation-bar {
  /* iOS blur effect */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  width: 100%;
}

.flue-nav-bar-middle {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 60%;
}
</style>
