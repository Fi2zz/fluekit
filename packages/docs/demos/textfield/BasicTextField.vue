<template>
  <Column :gap="20">
    <TextField
      v-model="value"
      :decoration="
        InputDecoration({
          labelText: 'Username',
          hintText: 'Enter your username',
          border: OutlineInputBorder(),
        })
      "
    />

    <TextField
      v-model="password"
      obscure-text
      :decoration="
        InputDecoration({
          labelText: 'Password',
          hintText: 'Enter your password',
          border: OutlineInputBorder(),
          prefixText: '🔒 ',
          floatingLabelBehavior: FloatingLabelBehavior.always,
        })
      "
    />
    <TextField
      v-model="password"
      obscure-text
      :decoration="
        InputDecoration({
          labelText: 'Password',
          hintText: 'Enter your password',
          border: UnderlineInputBorder(),
          prefixText: '🔒 ',
        })
      "
    />

    <Text>Username: {{ value }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Column,
  Text,
  TextField,
  OutlineInputBorder,
  InputDecoration,
  UnderlineInputBorder,
  FloatingLabelBehavior,
} from "fluekit";

const value = ref("");
const password = ref("");
</script>
