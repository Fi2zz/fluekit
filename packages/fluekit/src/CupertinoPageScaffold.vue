<template>
  <Container :color="backgroundColor" width="100%" height="100%" clip-behavior="hardEdge">
    <Stack fit="expand">
      <Column expanded>
        <!-- Navigation Bar -->
        <slot name="navigationBar" />

        <!-- Main Content -->
        <Expanded :min-size="0">
          <Stack fit="expand">
            <slot />
            <slot name="body" />
          </Stack>
        </Expanded>
      </Column>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import Container from "./Container.vue";
import Stack from "./Stack.vue";
import Column from "./Column.vue";
import Expanded from "./Expanded.vue";

export interface CupertinoPageScaffoldProps {
  backgroundColor?: string;
}

withDefaults(defineProps<CupertinoPageScaffoldProps>(), {
  backgroundColor: "#F2F2F7", // Default iOS grouped background color
});
</script>
