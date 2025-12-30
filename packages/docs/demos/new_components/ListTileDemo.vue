<template>
  <Column>
    <ListTile title="One-line list tile" @tap="() => console.log('tap')" />
    <Divider />
    <ListTile title="Two-line list tile" subtitle="Here is a subtitle" :leading="IconPlaceholder" />
    <Divider />
    <ListTile
      title="Three-line list tile"
      subtitle="A sufficiently long subtitle that warrants three lines."
      :leading="IconPlaceholder"
      :trailing="IconPlaceholder"
      :selected="true"
    />
  </Column>
</template>

<script setup lang="ts">
import { Column, ListTile, Divider, Container } from "fluekit";
import { h } from "vue";

const IconPlaceholder = h(Container, { width: 24, height: 24, color: "#ccc" });
</script>
