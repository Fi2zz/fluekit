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
  BorderRadius,
} from "fluekit";

const selectedValue = ref("map");
const selectedSize = ref("s");
const customStyle = ref("a");
</script>

<template>
  <Container
    height="450"
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
      <SizedBox :height="40" />
      <Text>Custom Decoration (Selected: {{ customStyle }})</Text>
      <SizedBox :height="10" />
      <SlidingSegmentedControl
        v-model="customStyle"
        :options="{
          a: 'Option A',
          b: 'Option B',
          c: 'Option C',
        }"
        :decoration="
          BoxDecoration({
            color: '#e0f7fa',
            borderRadius: BorderRadius.circular(20),
            border: Border.all({ width: 2, color: '#006064' }),
          })
        "
        :thumbDecoration="
          BoxDecoration({
            color: '#00acc1',
            borderRadius: BorderRadius.circular(16),
          })
        "
      />
    </Column>
  </Container>
</template>
