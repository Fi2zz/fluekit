<template>
  <Container :width="120" :height="120" :decoration="decoration" alignment="center">
    <Text data="Decorated" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text, BoxDecoration, BorderRadius, Border, BoxShadow } from "fluekit";

const decoration = BoxDecoration({
  color: "white",
  borderRadius: BorderRadius.all(20),
  border: Border.all({ color: "purple", width: 4 }),
  boxShadow: [
    BoxShadow({
      color: "rgba(0,0,0,0.5)",
      blurRadius: 10,
      spreadRadius: 5,
      offset: { x: 5, y: 5 },
    }),
  ],
});
</script>
