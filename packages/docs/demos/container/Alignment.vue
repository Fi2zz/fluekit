<template>
  <Container
    :width="150"
    :height="100"
    color="grey"
    alignment="center"
    :margin="EdgeInsets.only({ bottom: 10 })"
  >
    <Container :width="50" :height="50" color="red" />
  </Container>
</template>

<script setup lang="ts">
import { Container, EdgeInsets } from "fluekit";
</script>
