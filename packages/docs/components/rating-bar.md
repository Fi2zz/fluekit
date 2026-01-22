# RatingBar

A rating component that displays a row of stars. Supports half-star ratings and custom styling.

## Usage

```vue
<script setup>
import { ref } from "vue";
import { RatingBar } from "fluekit";

const rating = ref(3.5);
</script>

<template>
  <RatingBar v-model="rating" :allow-half-rating="true" />
</template>
```

## Props

| Prop              | Type               | Default   | Description                           |
| ----------------- | ------------------ | --------- | ------------------------------------- |
| `modelValue`      | `number`           | `0`       | The current rating value.             |
| `max`             | `number`           | `5`       | The maximum rating (number of stars). |
| `size`            | `number \| string` | `24`      | The size of the stars.                |
| `color`           | `string \| Color`  | `#FFC107` | The color of filled stars.            |
| `unselectedColor` | `string \| Color`  | `#E0E0E0` | The color of empty stars.             |
| `allowHalfRating` | `boolean`          | `false`   | Whether to allow half-star ratings.   |
| `readonly`        | `boolean`          | `false`   | Whether the rating is read-only.      |

## Events

| Event               | Payload  | Description                      |
| ------------------- | -------- | -------------------------------- |
| `update:modelValue` | `number` | Emitted when the rating changes. |

## Examples

### Interactive Demo

<script setup>
import BasicDemo from '../demos/rating-bar/BasicDemo.vue';
</script>

<BasicDemo />

### Basic Usage

```vue
<RatingBar v-model="rating" />
```

### Half Rating

```vue
<RatingBar v-model="rating" allow-half-rating />
```

### Readonly

```vue
<RatingBar :model-value="4.5" readonly allow-half-rating />
```

### Custom Style

```vue
<RatingBar v-model="rating" :size="30" color="red" unselected-color="#FFCDD2" />
```
