<template>
  <Column>
    <Button @click="showDialog">Show Dialog</Button>

    <AlertDialog v-model:visible="dialogVisible" title="Alert" content="This is an alert dialog.">
      <template #actions>
        <Button @click="dialogVisible = false">Cancel</Button>
        <Button @click="dialogVisible = false">OK</Button>
      </template>
    </AlertDialog>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Button, AlertDialog } from "fluekit";

const dialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};
</script>
