<template>
  <Column :gap="20">
    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal" />
      <Text>Checkbox: {{ checkVal }}</Text>
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Checkbox } from "fluekit";

const checkVal = ref(false);
</script>
