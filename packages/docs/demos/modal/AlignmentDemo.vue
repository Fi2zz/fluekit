<template>
  <div class="demo-container">
    <div class="grid-controls">
      <Button
        v-for="align in alignments"
        :key="align.label"
        @pressed="open(align.value)"
        class="grid-btn"
      >
        {{ align.label }}
      </Button>
    </div>

    <Modal v-model:visible="visible" :alignment="currentAlignment">
      <div class="modal-box">
        <h3>{{ currentLabel }}</h3>
        <p>This modal is aligned to {{ currentLabel }}.</p>
        <Button @pressed="visible = false">Close</Button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Modal, Button, Alignment } from "fluekit";

const visible = ref(false);
const currentAlignment = ref(Alignment.center);

const alignments = [
  { label: "Top Left", value: Alignment.topLeft },
  { label: "Top Center", value: Alignment.topCenter },
  { label: "Top Right", value: Alignment.topRight },
  { label: "Center Left", value: Alignment.centerLeft },
  { label: "Center", value: Alignment.center },
  { label: "Center Right", value: Alignment.centerRight },
  { label: "Bottom Left", value: Alignment.bottomLeft },
  { label: "Bottom Center", value: Alignment.bottomCenter },
  { label: "Bottom Right", value: Alignment.bottomRight },
];

const currentLabel = computed(() => {
  return alignments.find((a) => a.value === currentAlignment.value)?.label || "Unknown";
});

const open = (alignment: Alignment) => {
  currentAlignment.value = alignment;
  visible.value = true;
};
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.grid-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 400px;
}

.grid-btn {
  width: 100%;
  min-width: 100px;
}

.modal-box {
  background: white;
  padding: 24px;
  border-radius: 12px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-box h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.modal-box p {
  margin: 0;
  color: #666;
}
</style>
