<template>
  <Column :gap="20">
    <TextField
      v-model="value"
      :decoration="{
        labelText: 'Username',
        hintText: 'Enter your username',
        border: OutlineInputBorder(),
      }"
    />

    <TextField
      v-model="password"
      obscure-text
      :decoration="{
        labelText: 'Password',
        hintText: 'Enter your password',
        border: OutlineInputBorder(),
        prefixText: '🔒 ',
      }"
    />

    <Text>Username: {{ value }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextField, OutlineInputBorder } from "fluekit";

const value = ref("");
const password = ref("");
</script>
