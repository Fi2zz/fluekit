<template>
  <Container :width="200" :height="200" :decoration="lightGrayDecoration">
    <Stack>
      <Container :width="200" :height="200" :decoration="grayDecoration" />
      <Positioned :top="20" :left="20">
        <Container :width="50" :height="50" :decoration="redDecoration" />
      </Positioned>
      <Positioned :bottom="20" :right="20">
        <Container :width="50" :height="50" :decoration="blueDecoration" />
      </Positioned>
      <Center>
        <Text data="Centered in Stack" :style="whiteTextStyle" />
      </Center>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { Container, Stack, Positioned, Center, Text, BoxDecoration, TextStyle } from "fluekit";

const lightGrayDecoration = BoxDecoration({ color: "#ddd" });
const grayDecoration = BoxDecoration({ color: "grey" });
const redDecoration = BoxDecoration({ color: "red" });
const blueDecoration = BoxDecoration({ color: "blue" });
const whiteTextStyle = TextStyle({ color: "white" });
</script>
