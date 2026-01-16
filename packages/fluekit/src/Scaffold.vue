<template>
  <Container :color="backgroundColor" width="100%" height="100%" clip-behavior="hardEdge">
    <Stack fit="expand">
      <!-- Main Layout -->
      <Column expanded>
        <slot name="appBar" />
        <Expanded :min-size="0">
          <Stack fit="expand">
            <slot />
            <slot name="body" />
          </Stack>
        </Expanded>
        <slot name="bottomNavigationBar" />
      </Column>

      <!-- Floating Action Button -->
      <Positioned v-if="$slots.floatingActionButton" :bottom="16" :right="16">
        <slot name="floatingActionButton" />
      </Positioned>

      <!-- Drawer (Placeholder for future implementation) -->
      <slot name="drawer" />
      <slot name="endDrawer" />
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import Container from "./Container.vue";
import Stack from "./Stack.vue";
import Column from "./Column.vue";
import Expanded from "./Expanded.vue";
import Positioned from "./Positioned.vue";
import { Color } from "./Color";

export interface ScaffoldProps {
  backgroundColor?: string | Color;
}

withDefaults(defineProps<ScaffoldProps>(), {
  backgroundColor: "#FFFFFF",
});
</script>
