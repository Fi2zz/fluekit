<template>
  <Container :width="120" :height="120" :decoration="gradientDecoration" alignment="center">
    <Text data="Gradient" :style="whiteTextStyle" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text, BorderRadius, BoxDecoration, TextStyle } from "fluekit";

const gradientDecoration = BoxDecoration({
  gradient: "linear-gradient(45deg, blue, red)",
  borderRadius: BorderRadius.all(10),
});

const whiteTextStyle = TextStyle({ color: "white" });
</script>
