<script setup lang="ts">
import { ref } from "vue";
import {
  SlidingSegmentedControl,
  Container,
  Text,
  Column,
  SizedBox,
  BoxDecoration,
  Border,
  EdgeInsets,
} from "fluekit";

const selectedValue = ref("map");
const selectedSize = ref("s");
</script>

<template>
  <Container
    height="300"
    :padding="EdgeInsets.all(10)"
    :decoration="
      BoxDecoration({
        border: Border.all({ width: 1, color: '#eee' }),
      })
    "
    width="100%"
  >
    <Column expanded crossAxisAlignment="center">
      <Text>Selected: {{ selectedValue }}</Text>
      <SizedBox :height="10" />
      <SlidingSegmentedControl
        v-model="selectedValue"
        :options="{
          map: 'Map',
          transit: 'Transit',
          satellite: 'Satellite',
        }"
      />
      <SizedBox :height="40" />
      <Text>Sizes (Selected: {{ selectedSize }})</Text>
      <SizedBox :height="10" />
      <SlidingSegmentedControl
        v-model="selectedSize"
        :options="{
          s: 'Small',
          m: 'Medium',
          l: 'Large',
          xl: 'Extra Large (Disabled)',
        }"
        :disabledKeys="['xl']"
      />
    </Column>
  </Container>
</template>
