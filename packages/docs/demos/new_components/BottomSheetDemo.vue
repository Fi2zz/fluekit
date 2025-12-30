<template>
  <Column>
    <Button @click="showBottomSheet">Show BottomSheet</Button>

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
import { Column, Button, BottomSheet, Text, EdgeInsets } from "fluekit";

const bottomSheetVisible = ref(false);

const showBottomSheet = () => {
  bottomSheetVisible.value = true;
};
</script>
