<template>
  <Button @click="showSnackBar">Show SnackBar</Button>
</template>

<script setup lang="ts">
import { Button, SnackBar } from "fluekit";

const showSnackBar = () => {
  SnackBar.show({
    content: "This is a SnackBar!",
    actionLabel: "Undo",
    onAction: () => console.log("Undo clicked"),
  });
};
</script>
