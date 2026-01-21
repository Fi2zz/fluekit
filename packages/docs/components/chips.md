# Chip Family

Chips are compact elements that represent an attribute, text, entity, or action.

## Components

- **Chip**: Displays information or an attribute. Can have an avatar and a delete icon.
- **ActionChip**: Represents a primary action.
- **ChoiceChip**: Allows selection from a set of options.

<script setup>
import ChipDemo from '../demos/new_components/ChipDemo.vue'
</script>

<div class="demo-container">
  <ChipDemo />
</div>

## Code Example

<<< ../demos/new_components/ChipDemo.vue

## Chip Props

| Prop            | Type              | Default            | Description                           |
| --------------- | ----------------- | ------------------ | ------------------------------------- |
| label           | `string`          | -                  | The content of the chip.              |
| avatar          | `Component`       | -                  | An optional avatar widget.            |
| backgroundColor | `string \| Color` | `Colors.grey[300]` | The background color.                 |
| labelColor      | `string \| Color` | `Colors.black87`   | The text color.                       |
| onDeleted       | `() => void`      | -                  | Callback when delete icon is pressed. |

## ActionChip Props

Inherits `Chip` props, plus:

| Prop      | Type         | Default | Description                        |
| --------- | ------------ | ------- | ---------------------------------- |
| onPressed | `() => void` | -       | Callback when the chip is pressed. |

## ChoiceChip Props

Inherits `Chip` props, plus:

| Prop          | Type                       | Default       | Description                            |
| ------------- | -------------------------- | ------------- | -------------------------------------- |
| selected      | `boolean`                  | `false`       | Whether the chip is selected.          |
| selectedColor | `string \| Color`          | `Colors.blue` | Background color when selected.        |
| onSelected    | `(value: boolean) => void` | -             | Callback when selection state changes. |
