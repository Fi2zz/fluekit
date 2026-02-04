<template>
  <div class="demo-container">
    <h2>Basic Decoration</h2>
    <div class="example-section">
      <TextField
        v-model="text1"
        :decoration="
          InputDecoration({
            labelText: 'Username',
            hintText: 'Enter your username',
            helperText: 'Username must be unique',
          })
        "
      />
    </div>

    <h2>Borders</h2>
    <div class="example-section">
      <h3>Outline Border</h3>
      <TextField
        v-model="text2"
        :decoration="
          InputDecoration({
            labelText: 'Outline',
            border: OutlineInputBorder(),
          })
        "
      />

      <h3>Underline Border (Default)</h3>
      <TextField
        v-model="text3"
        :decoration="
          InputDecoration({
            labelText: 'Underline',
            border: UnderlineInputBorder(),
          })
        "
      />

      <h3>No Border</h3>
      <TextField
        v-model="text4"
        :decoration="
          InputDecoration({
            labelText: 'No Border',
            border: InputBorder.none,
          })
        "
      />
    </div>

    <h2>Icons</h2>
    <div class="example-section">
      <TextField
        v-model="text5"
        :decoration="
          InputDecoration({
            labelText: 'With Icons',
            icon: Icons.person,
            prefixIcon: Icons.person,
            suffixIcon: Icons.checkCircle,
            border: OutlineInputBorder(),
          })
        "
      />
    </div>

    <h2>Floating Label Behavior</h2>
    <div class="example-section">
      <h3>Always</h3>
      <TextField
        v-model="text6"
        :decoration="
          InputDecoration({
            labelText: 'Always Floating',
            floatingLabelBehavior: FloatingLabelBehavior.always,
            border: OutlineInputBorder(),
          })
        "
      />

      <h3>Never</h3>
      <TextField
        v-model="text7"
        :decoration="
          InputDecoration({
            labelText: 'Never Floating',
            floatingLabelBehavior: FloatingLabelBehavior.never,
            border: OutlineInputBorder(),
          })
        "
      />
    </div>

    <h2>Error State</h2>
    <div class="example-section">
      <TextField
        v-model="text8"
        :decoration="
          InputDecoration({
            labelText: 'Error Input',
            errorText: 'Invalid input value',
            border: OutlineInputBorder(),
          })
        "
      />
    </div>

    <h2>Prefix & Suffix Text</h2>
    <div class="example-section">
      <TextField
        v-model="text9"
        :decoration="
          InputDecoration({
            labelText: 'Price',
            prefixText: '$',
            suffixText: 'USD',
            border: OutlineInputBorder(),
          })
        "
      />
    </div>

    <h2>Filled & Custom Color</h2>
    <div class="example-section">
      <TextField
        v-model="text10"
        :decoration="
          InputDecoration({
            labelText: 'Filled Input',
            filled: true,
            fillColor: Colors.grey200,
            border: OutlineInputBorder({
              borderSide: BorderSide({ style: 'none', width: 0 }),
              borderRadius: BorderRadius.circular(8),
            }),
          })
        "
      />
    </div>

    <h2>Dense</h2>
    <div class="example-section">
      <TextField
        v-model="text11"
        :decoration="
          InputDecoration({
            labelText: 'Dense Input',
            isDense: true,
            border: OutlineInputBorder(),
          })
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TextField,
  InputDecoration,
  OutlineInputBorder,
  UnderlineInputBorder,
  InputBorder,
  Icons,
  Colors,
  FloatingLabelBehavior,
  BorderSide,
  BorderRadius,
} from "fluekit";

const text1 = ref("");
const text2 = ref("");
const text3 = ref("");
const text4 = ref("");
const text5 = ref("");
const text6 = ref("");
const text7 = ref("");
const text8 = ref("Wrong Value");
const text9 = ref("");
const text10 = ref("");
const text11 = ref("");
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 600px;
}

.example-section {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
}

h3 {
  margin-bottom: 8px;
  font-size: 16px;
  color: #666;
}
</style>
