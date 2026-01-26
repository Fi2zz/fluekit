# SlidingSegmentedControl

A iOS-style segmented control with a sliding thumb.

## Usage

Use `SlidingSegmentedControl` to select one option from a set. The selection is mutually exclusive.

<script setup>
import SlidingSegmentedControlDemo from '../demos/new_components/SlidingSegmentedControlDemo.vue'
</script>

<div class="demo-container">
  <SlidingSegmentedControlDemo />
</div>

## Code Example

<<< ../demos/new_components/SlidingSegmentedControlDemo.vue

## Props

| Prop            | Type                               | Default             | Description                                  |
| --------------- | ---------------------------------- | ------------------- | -------------------------------------------- |
| modelValue      | `string \| number`                 | -                   | The currently selected key.                  |
| options         | `Record<string \| number, string>` | -                   | Map of values to labels.                     |
| disabledKeys    | `(string \| number)[]`             | `[]`                | List of keys that should be disabled.        |
| backgroundColor | `string \| Color`                  | `systemGrey5`       | Background color of the control.             |
| thumbColor      | `string \| Color`                  | `white`             | Color of the sliding thumb.                  |
| decoration      | `BoxDecoration`                    | -                   | Custom decoration for the control container. |
| thumbDecoration | `BoxDecoration`                    | -                   | Custom decoration for the sliding thumb.     |
| padding         | `EdgeInsets`                       | `EdgeInsets.all(2)` | Padding around the control content.          |

## Events

| Name              | Description                     |
| ----------------- | ------------------------------- |
| update:modelValue | Emitted when selection changes. |
