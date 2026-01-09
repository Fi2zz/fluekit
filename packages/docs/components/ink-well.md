# InkWell

A rectangular area of a Material that responds to touch.

## Usage

<script setup>
import InkWellDemo from '@example/demos/new_components/InkWellDemo.vue'
</script>

<div class="demo-box">
  <InkWellDemo />
</div>

<<< ../demos/new_components/InkWellDemo.vue

## API

### Props

| Name             | Type      | Default                | Description                                            |
| :--------------- | :-------- | :--------------------- | :----------------------------------------------------- |
| `splashColor`    | `string`  | `'rgba(0, 0, 0, 0.1)'` | The splash color of the ink response.                  |
| `highlightColor` | `string`  | -                      | The highlight color of the ink response when pressed.  |
| `borderRadius`   | `string`  | -                      | The clipping radius of the splash (CSS border-radius). |
| `disabled`       | `boolean` | `false`                | Whether the ink well is disabled.                      |

### Events

| Name  | Description                            |
| :---- | :------------------------------------- |
| `tap` | Triggered when the ink well is tapped. |
