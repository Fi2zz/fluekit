# Checkbox

A material design checkbox.

## Usage

<script setup>
import CheckboxDemo from '@example/demos/new_components/CheckboxDemo.vue'
</script>

<div class="demo-box">
  <CheckboxDemo />
</div>

<<< ../demos/new_components/CheckboxDemo.vue

## API

### Props

| Name            | Type                | Default     | Description                                     |
| :-------------- | :------------------ | :---------- | :---------------------------------------------- |
| `value`         | `boolean`           | -           | Whether this checkbox is checked.               |
| `activeColor`   | `string`            | `'#2196F3'` | The color to use when this checkbox is checked. |
| `checkColor`    | `string`            | `'#FFFFFF'` | The color of the checkmark.                     |
| `labelPosition` | `'left' \| 'right'` | `'right'`   | The position of the label.                      |
| `hideIcon`      | `boolean`           | `false`     | Whether to hide the check icon.                 |

### Slots

| Name      | Description        |
| :-------- | :----------------- |
| `default` | The label content. |

### Events

| Name           | Description                                           |
| :------------- | :---------------------------------------------------- |
| `update:value` | Emitted when the value changes.                       |
| `change`       | Emitted when the value of the checkbox should change. |

## CheckboxGroup

A wrapper for grouping checkboxes.

### Props

| Name       | Type      | Default | Description                                   |
| :--------- | :-------- | :------ | :-------------------------------------------- |
| `value`    | `any[]`   | `[]`    | The currently selected values (v-model).      |
| `disabled` | `boolean` | `false` | Whether all checkboxes in the group disabled. |

### Events

| Name           | Description                     |
| :------------- | :------------------------------ |
| `update:value` | Emitted when the value changes. |
| `change`       | Emitted when the value changes. |
