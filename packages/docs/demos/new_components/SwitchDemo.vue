<template>
  <Column :gap="20">
    <Row :gap="20" cross-axis-alignment="center">
      <Switch v-model:value="switchVal" />
      <Text>Switch: {{ switchVal }}</Text>
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Switch } from "fluekit";

const switchVal = ref(false);
</script>
