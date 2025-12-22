<template>
  <Container
    :width="120"
    :height="120"
    :foregroundDecoration="foregroundDecoration"
    alignment="center"
    :decoration="backgroundDecoration"
  >
    <Text data="Content" :style="largeWhiteTextStyle" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text, Border, BorderRadius, BoxDecoration, TextStyle } from "fluekit";

const foregroundDecoration = BoxDecoration({
  border: Border.all({ color: "rgba(255,255,255,1)", width: 5 }),
  borderRadius: BorderRadius.all(10), // Circle overlay
  color: "green",
  opacity: 0.7,
});

const backgroundDecoration = BoxDecoration({
  color: "black",
  borderRadius: BorderRadius.all(3),
});

const largeWhiteTextStyle = TextStyle({ color: "white", fontSize: 32 });
</script>
