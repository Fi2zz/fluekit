<template>
  <Column :gap="20">
    <Text>ClipRRect:</Text>
    <ClipRRect :border-radius="BorderRadius.circular(20)">
      <Container :width="100" :height="100" color="orange">
        <Center><Text>Rounded</Text></Center>
      </Container>
    </ClipRRect>

    <Text>ClipOval:</Text>
    <ClipOval>
      <Container :width="100" :height="100" color="purple">
        <Center><Text>Circle</Text></Center>
      </Container>
    </ClipOval>
  </Column>
</template>

<script setup lang="ts">
import { Column, Text, Container, Center, ClipRRect, ClipOval, BorderRadius } from "fluekit";
</script>
