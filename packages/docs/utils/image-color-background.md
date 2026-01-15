# ImageColorBackground

A widget that generates a background color based on the dominant color of an image.

## Usage

<script setup>
import ImageColorBackgroundDemo from '@example/demos/utils/ImageColorBackground.vue'
</script>

<div class="demo-box">
  <ImageColorBackgroundDemo />
</div>

<<< ../demos/utils/ImageColorBackground.vue

## Props

| Prop    | Type               | Default     | Description                                    |
| ------- | ------------------ | ----------- | ---------------------------------------------- |
| src     | `string`           | Required    | The URL of the image to analyze.               |
| width   | `number \| string` | `undefined` | The width of the container.                    |
| height  | `number \| string` | `undefined` | The height of the container.                   |
| opacity | `number`           | `1.0`       | The opacity of the generated background color. |

## Slots

| Slot    | Props                                          | Description                                                                             |
| ------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| default | `{ color: Color \| null, isLoading: boolean }` | The content to display. The slot receives the extracted color object and loading state. |
