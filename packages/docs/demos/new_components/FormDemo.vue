<template>
  <Column :gap="20">
    <Row :gap="20" cross-axis-alignment="center">
      <Switch v-model:value="switchVal" />
      <Text>Switch: {{ switchVal }}</Text>
    </Row>

    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal" />
      <Text>Checkbox: {{ checkVal }}</Text>
    </Row>

    <Row :gap="20" cross-axis-alignment="center">
      <Radio :value="'A'" v-model:groupValue="radioVal" />
      <Text>A</Text>
      <Radio :value="'B'" v-model:groupValue="radioVal" />
      <Text>B</Text>
      <Text>Selected: {{ radioVal }}</Text>
    </Row>

    <Column :gap="10">
      <Text>Slider: {{ sliderVal.toFixed(1) }}</Text>
      <Slider v-model:value="sliderVal" :min="0" :max="100" />
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Switch, Checkbox, Radio, Slider } from "fluekit";

const switchVal = ref(false);
const checkVal = ref(false);
const radioVal = ref("A");
const sliderVal = ref(30);
</script>
