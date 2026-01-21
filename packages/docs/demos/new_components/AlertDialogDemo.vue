<template>
  <Column>
    <Button @click="showDefaultDialog">Default Dialog with default actions</Button>
    <AlertDialog
      v-model:visible="defaultDialogVisible"
      :constraints="BoxConstraints({ minWidth: 400, maxWidth: 600 })"
      title="Alert with default actions"
      content="This is an alert dialog."
    >
    </AlertDialog>
  </Column>
  <Column>
    <Button @click="showDialog">Show Dialog with custom actions</Button>
    <AlertDialog
      v-model:visible="dialogVisible"
      :constraints="BoxConstraints({ minWidth: 400, maxWidth: 600 })"
      title="Alert with custom actions"
      content="This is an alert dialog with custom actions."
    >
      <template #actions>
        <Button @click="dialogVisible = false">Cancel</Button>
        <Button @click="dialogVisible = false">OK</Button>
      </template>
    </AlertDialog>
  </Column>
  <Column>
    <Button @click="showIOSDialog">Show iOS Style Dialog</Button>
    <AlertDialog
      v-model:visible="iosDialogVisible"
      title="Confirm Delete"
      content="Are you sure you want to delete this item? This action cannot be undone."
      variant="ios"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Button, AlertDialog, BoxConstraints } from "fluekit";

const dialogVisible = ref(false);
const defaultDialogVisible = ref(false);
const iosDialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};
const showDefaultDialog = () => {
  defaultDialogVisible.value = true;
};
const showIOSDialog = () => {
  iosDialogVisible.value = true;
};
</script>
