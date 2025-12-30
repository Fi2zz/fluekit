<template>
  <Container :width="100" :height="100" color="#e0e0e0">
    <InkWell @tap="onTap">
      <Center>
        <Text>Tap Me</Text>
      </Center>
    </InkWell>
  </Container>
</template>

<script setup lang="ts">
import { Container, InkWell, Center, Text } from "fluekit";

const onTap = () => {
  console.log("InkWell tapped");
};
</script>
