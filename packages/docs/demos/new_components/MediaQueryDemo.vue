<template>
  <Column :gap="20">
    <Container color="#f5f5f5" :padding="EdgeInsets.all(20)">
      <Text :style="{ fontSize: 20, fontWeight: 'bold' }">Global MediaQuery</Text>
      <Text>Width: {{ mediaQuery.size.width }}</Text>
      <Text>Height: {{ mediaQuery.size.height }}</Text>
      <Text>Device Pixel Ratio: {{ mediaQuery.devicePixelRatio }}</Text>
      <Text>Platform Brightness: {{ mediaQuery.platformBrightness }}</Text>
      <Text :style="{ color: '#666', fontSize: 12 }">Try resizing the window!</Text>
    </Container>

    <MediaQuery :data="customData">
      <Container color="#e3f2fd" :padding="EdgeInsets.all(20)">
        <Text :style="{ fontSize: 20, fontWeight: 'bold' }"
          >Nested MediaQuery (Custom Override)</Text
        >
        <Text>Wrapping a child component with custom data:</Text>
        <Text>Width: 800, Brightness: dark</Text>
        <div style="margin-top: 10px; padding: 10px; border: 1px dashed #999">
          <ChildComponent />
        </div>
      </Container>
    </MediaQuery>
  </Column>
</template>

<script setup lang="ts">
import { Column, Container, Text, EdgeInsets, useMediaQuery, MediaQuery, Size } from "fluekit";
import { reactive, defineComponent, h } from "vue";

const mediaQuery = useMediaQuery();

const customData = reactive({
  size: { width: 800, height: 600 },
  devicePixelRatio: 2,
  platformBrightness: "dark" as const,
});

// Inline child component to test injection
const ChildComponent = defineComponent({
  setup() {
    const mq = useMediaQuery();
    return () =>
      h("div", [
        h("div", `Injected Width: ${mq.size.width}`),
        h("div", `Injected Brightness: ${mq.platformBrightness}`),
      ]);
  },
});
</script>
