# AspectRatio

A widget that attempts to size the child to a specific aspect ratio.

## Usage

<script setup>
import AspectRatioDemo from '@example/demos/layout/AspectRatio.vue'
</script>

<div class="demo-box">
  <AspectRatioDemo />
</div>

<<< ../demos/layout/AspectRatio.vue

## Props

| Prop        | Type     | Default  | Description                                                                                                                                                                    |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aspectRatio | `number` | Required | The aspect ratio to attempt to use. The aspect ratio is expressed as a ratio of width to height. For example, a 16:9 width:height aspect ratio would have a value of 16.0/9.0. |
