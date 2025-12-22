<template>
  <Container :width="300" :height="100" color="#eee">
    <Center>
      <Text data="Scroll the page to see the Fixed element" />
    </Center>
    <!-- Fixed element is relative to viewport -->
    <Fixed :bottom="20" :right="20" :zIndex="1000">
      <Container
        :padding="EdgeInsets.all(10)"
        :decoration="BoxDecoration({ borderRadius: BorderRadius.all(20), color: 'black' })"
      >
        <Text data="Fixed Badge" :style="TextStyle({ color: 'white' })" />
      </Container>
    </Fixed>
  </Container>
</template>

<script setup lang="ts">
import {
  Container,
  Center,
  Fixed,
  Text,
  BoxDecoration,
  BorderRadius,
  EdgeInsets,
  TextStyle,
} from "fluekit";
</script>
