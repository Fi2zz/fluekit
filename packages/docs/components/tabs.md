# Tabs

A Material Design widget that displays a horizontal row of tabs.

## Usage

Use `TabBar` and `TabBarView` together to create a tabbed interface. Sync them using `v-model`.

<script setup>
import TabsDemo from '../demos/new_components/TabsDemo.vue'
</script>

<div class="demo-container">
  <TabsDemo />
</div>

<<< ../demos/new_components/TabsDemo.vue

## Code Example

```vue
<template>
  <Column expanded>
    <TabBar v-model="activeIndex" :tabs="['Tab 1', 'Tab 2']" />

    <TabBarView v-model="activeIndex">
      <Container color="red"><Text>Content 1</Text></Container>
      <Container color="blue"><Text>Content 2</Text></Container>
    </TabBarView>
  </Column>
</template>

<script setup>
import { ref } from "vue";
const activeIndex = ref(0);
</script>
```

## TabBar Props

| Prop                 | Type                                                | Default           | Description                              |
| -------------------- | --------------------------------------------------- | ----------------- | ---------------------------------------- |
| modelValue           | `number`                                            | -                 | The index of the currently selected tab. |
| tabs                 | `(string \| { text?: string, icon?: Component })[]` | -                 | The list of tabs to display.             |
| indicatorColor       | `string \| Color`                                   | `Colors.blue`     | The color of the indicator line.         |
| labelColor           | `string \| Color`                                   | `Colors.blue`     | The color of selected tab labels.        |
| unselectedLabelColor | `string \| Color`                                   | `rgba(0,0,0,0.6)` | The color of unselected tab labels.      |

## TabBarView Props

| Prop       | Type     | Default | Description                               |
| ---------- | -------- | ------- | ----------------------------------------- |
| modelValue | `number` | -       | The index of the currently visible child. |

## TabBarView Slots

| Name    | Description                                 |
| ------- | ------------------------------------------- |
| default | The widgets to display. One widget per tab. |
