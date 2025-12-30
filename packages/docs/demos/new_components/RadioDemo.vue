<template>
  <Column :gap="20">
    <Row :gap="20" cross-axis-alignment="center">
      <Radio :value="'A'" v-model:groupValue="radioVal" />
      <Text>A</Text>
      <Radio :value="'B'" v-model:groupValue="radioVal" />
      <Text>B</Text>
      <Text>Selected: {{ radioVal }}</Text>
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Radio } from "fluekit";

const radioVal = ref("A");
</script>
