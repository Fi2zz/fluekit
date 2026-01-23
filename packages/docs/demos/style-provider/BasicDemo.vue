<template>
  <div class="demo-section">
    <h3>Basic Style Inheritance</h3>
    <StyleProvider :style="{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }">
      <div class="box">
        <Text>I inherit styles from StyleProvider</Text>
        <Container :margin="EdgeInsets.only({ top: 10 })">
          <Text>Me too!</Text>
        </Container>
      </div>
    </StyleProvider>

    <h3>Nested Providers</h3>
    <StyleProvider :style="{ color: 'green', fontSize: '16px' }">
      <div class="box">
        <Text>Green Text</Text>

        <StyleProvider :style="{ color: 'red', fontStyle: 'italic' }">
          <div class="nested-box">
            <Text>Red Italic Text (Merged)</Text>
          </div>
        </StyleProvider>
      </div>
    </StyleProvider>
  </div>
</template>

<script setup lang="ts">
import { StyleProvider, Text, Container, EdgeInsets } from "fluekit";
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.box {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}

.nested-box {
  border: 1px dashed #aaa;
  padding: 12px;
  margin-top: 12px;
  border-radius: 6px;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
