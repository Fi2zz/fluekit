<template>
  <div class="demo-section">
    <h3>Basic Modal</h3>
    <Button @pressed="modalVisible = true">Open Modal</Button>

    <Modal v-model:visible="modalVisible">
      <div class="modal-box">
        <h3>Hello from Modal</h3>
        <p>This is a basic modal example.</p>
        <Button @pressed="modalVisible = false">Close</Button>
      </div>
    </Modal>
    <h3>Alignment</h3>
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

    <h3>Imperative Modal (showModal)</h3>
    <div class="grid-controls">
      <Button @pressed="openSimple">Simple Text</Button>
      <Button @pressed="openVNode">VNode (Render Function)</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Alignment, Button, Modal } from "fluekit";

import { showModal } from "fluekit";
import { computed, h, ref } from "vue";

const visible = ref(false);
const currentAlignment = ref<Alignment>(Alignment.center);
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

const modalVisible = ref(false);

const openSimple = () => {
  showModal({
    content: "Hello from imperative modal!",
    alignment: Alignment.center,
    barrierDismissible: true,
  });
};

const openVNode = () => {
  let closeHandle: () => void = () => {};

  // Create a VNode for the modal content
  const vnode = h(
    "div",
    {
      style: {
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "12px",
        minWidth: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      },
    },
    [
      h("h3", { style: { margin: 0 } }, "VNode Modal"),
      h(
        "p",
        { style: { margin: 0, color: "#666" } },
        "This content is rendered via Vue h() function.",
      ),
      // We can use FlueKit components inside h() too
      h(Button, { onPressed: () => closeHandle?.() }, () => "Close Me"),
    ],
  );

  const result = showModal({
    content: vnode,
    alignment: Alignment.center,
    barrierDismissible: true,
  });

  closeHandle = result.close;
};
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
