<template>
  <Column :gap="20">
    <Text>With hintText only:</Text>
    <TextField
      v-model="text1"
      :decoration="{
        hintText: 'Enter something...',
        border: OutlineInputBorder(),
      }"
    />

    <Text>No label, no hint:</Text>
    <TextField
      v-model="text2"
      :decoration="{
        border: OutlineInputBorder(),
      }"
    />

    <Text>Underline border without label:</Text>
    <TextField
      v-model="text3"
      :decoration="{
        hintText: 'Type here',
      }"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextField, OutlineInputBorder } from "fluekit";

const text1 = ref("");
const text2 = ref("");
const text3 = ref("");
</script>
