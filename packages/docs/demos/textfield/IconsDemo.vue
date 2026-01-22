<template>
  <Column :gap="20">
    <Text :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })"
      >Prefix & Suffix Text</Text
    >
    <TextField
      v-model="email"
      :decoration="{
        labelText: 'Email',
        hintText: 'example',
        prefixText: 'mailto:',
        suffixText: '@gmail.com',
        border: OutlineInputBorder(),
      }"
    />

    <Text :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })">With Icons</Text>
    <TextField
      v-model="username"
      :decoration="{
        labelText: 'Username',
        border: OutlineInputBorder(),
      }"
    >
      <template #prefixIcon>
        <Icon :icon="Icons.person" :size="20" color="#666" />
      </template>
      <template #suffixIcon>
        <Icon :icon="Icons.checkCircle" :size="20" color="green" />
      </template>
    </TextField>

    <Text :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })">Outside Icon</Text>
    <TextField
      v-model="search"
      :decoration="{
        labelText: 'Search',
        hintText: 'Type to search...',
      }"
    >
      <template #icon>
        <Icon :icon="Icons.search" :size="24" color="#666" />
      </template>
    </TextField>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Column,
  Text,
  TextField,
  OutlineInputBorder,
  Icon,
  Icons,
  TextStyle,
  FontWeight,
} from "fluekit";

const email = ref("");
const username = ref("");
const search = ref("");
</script>
