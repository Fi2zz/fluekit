# SegmentedControl

A linear set of two or more segments, each of which functions as a mutually exclusive button.

## Usage

<script setup>
import SegmentedControlDemo from '@example/demos/new_components/SegmentedControlDemo.vue'
</script>

<div class="demo-box">
  <SegmentedControlDemo />
</div>

<<< ../demos/new_components/SegmentedControlDemo.vue

## API

### Props

| Name              | Type                        | Default         | Description                        |
| :---------------- | :-------------------------- | :-------------- | :--------------------------------- |
| `modelValue`      | `any`                       | -               | The currently selected value.      |
| `items`           | `SegmentedControlItem<T>[]` | `[]`            | The list of items to display.      |
| `selectedColor`   | `string`                    | `'#007AFF'`     | The color of the selected item.    |
| `unselectedColor` | `string`                    | `'transparent'` | The color of the unselected items. |
| `borderColor`     | `string`                    | `'#007AFF'`     | The color of the border.           |
| `padding`         | `EdgeInsets`                | `symmetric`     | The padding of each item.          |

### SegmentedControlItem

```ts
interface SegmentedControlItem<T> {
  value: T;
  label: string;
}
```

### Events

| Name                | Description                              |
| :------------------ | :--------------------------------------- |
| `update:modelValue` | Emitted when the user selects a segment. |
| `change`            | Emitted when the user selects a segment. |
