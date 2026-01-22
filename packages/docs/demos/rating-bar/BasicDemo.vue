<template>
  <div class="rating-bar-demo">
    <div class="demo-section">
      <h3>Basic Usage</h3>
      <RatingBar v-model="rating1" />
      <p>Value: {{ rating1 }}</p>
    </div>

    <div class="demo-section">
      <h3>Half Rating</h3>
      <RatingBar v-model="rating2" allow-half-rating />
      <p>Value: {{ rating2 }}</p>
    </div>

    <div class="demo-section">
      <h3>Readonly</h3>
      <RatingBar :model-value="3.5" readonly allow-half-rating />
    </div>

    <div class="demo-section">
      <h3>Custom Style</h3>
      <RatingBar v-model="rating3" :size="30" color="#E91E63" unselected-color="#F8BBD0" />
    </div>

    <div class="demo-section">
      <h3>10 Stars</h3>
      <RatingBar v-model="rating4" :max="10" allow-half-rating />
      <p>Value: {{ rating4 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RatingBar } from "fluekit";

const rating1 = ref(3);
const rating2 = ref(2.5);
const rating3 = ref(4);
const rating4 = ref(7.5);
</script>

<style scoped>
.rating-bar-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
