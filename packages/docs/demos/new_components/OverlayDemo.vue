<template>
  <Column :gap="20">
    <Row :gap="20">
      <Button @click="showSnackBar">Show SnackBar</Button>
      <Button @click="showDialog">Show Dialog</Button>
      <Button @click="showBottomSheet">Show BottomSheet</Button>
    </Row>

    <AlertDialog v-model:visible="dialogVisible" title="Alert" content="This is an alert dialog.">
      <template #actions>
        <Button @click="dialogVisible = false">Cancel</Button>
        <Button @click="dialogVisible = false">OK</Button>
      </template>
    </AlertDialog>

    <BottomSheet v-model:visible="bottomSheetVisible" :padding="EdgeInsets.all(24)">
      <Column main-axis-size="min" :gap="16">
        <Text :style="{ fontSize: 20, fontWeight: 'bold' }">Bottom Sheet</Text>
        <Text>This is a persistent bottom sheet.</Text>
        <Button @click="bottomSheetVisible = false">Close</Button>
      </Column>
    </BottomSheet>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Button, AlertDialog, BottomSheet, SnackBar, Text, EdgeInsets } from "fluekit";

const dialogVisible = ref(false);
const bottomSheetVisible = ref(false);

const showSnackBar = () => {
  SnackBar.show({
    content: "This is a SnackBar!",
    actionLabel: "Undo",
    onAction: () => console.log("Undo clicked"),
  });
};

const showDialog = () => {
  dialogVisible.value = true;
};

const showBottomSheet = () => {
  bottomSheetVisible.value = true;
};
</script>
