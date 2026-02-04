<template>
  <div class="demo-section">
    <h3>Basic Modal</h3>
    <Button @pressed="showModal = true">Open Modal</Button>

    <Modal v-model:visible="showModal">
      <div class="modal-box">
        <h3>Hello from Modal</h3>
        <p>This is a basic modal example.</p>
        <Button @pressed="showModal = false">Close</Button>
      </div>
    </Modal>

    <h3>Custom Position</h3>
    <Button @pressed="showTopModal = true">Open Top Modal</Button>
    <Modal
      v-model:visible="showTopModal"
      :alignment="Alignment.topCenter"
      barrier-color="rgba(0,0,0,0.8)"
    >
      <div class="modal-box slide-down">
        <h3>Top Modal</h3>
        <p>Aligned to top center with custom barrier.</p>
        <Button @pressed="showTopModal = false">Close</Button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Modal, Button, Alignment } from "fluekit";

const showModal = ref(false);
const showTopModal = ref(false);
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.modal-box {
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-box h3 {
  margin-top: 0;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
