# DropdownButton

A button that allows selecting from a list of items.

## Usage

Use `DropdownButton` to let the user select a single value from a set of options.

<script setup>
import DropdownButtonDemo from '../demos/new_components/DropdownButtonDemo.vue'
</script>
<div class="demo-container">
  <DropdownButtonDemo />
</div>

## Code Example

<<< ../demos/new_components/DropdownButtonDemo.vue

## Props

| Prop        | Type                              | Default          | Description                                         |
| ----------- | --------------------------------- | ---------------- | --------------------------------------------------- |
| modelValue  | `any`                             | -                | The currently selected value.                       |
| items       | `Array<string \| {label, value}>` | `[]`             | The list of items to display.                       |
| variant     | `'material' \| 'ios'`             | `'ios'`          | The visual style of the dropdown.                   |
| placeholder | `string`                          | `'Select'`       | Text to display when no item is selected.           |
| expanded    | `boolean`                         | `false`          | Whether the button should fill the available width. |
| multiple    | `boolean`                         | `false`          | Whether multiple items can be selected.             |
| color       | `string \| Color`                 | `'transparent'`  | Background color of the button.                     |
| menuColor   | `string \| Color`                 | `Colors.white`   | Background color of the menu.                       |
| textColor   | `string \| Color`                 | `Colors.black87` | Color of the text.                                  |
| icon        | `any`                             | `ArrowDropDown`  | Custom icon for the dropdown.                       |
| iconColor   | `string \| Color`                 | -                | Color of the icon.                                  |
| elevation   | `number`                          | `8`              | Elevation of the menu (shadow).                     |
| offset      | `{x: number, y: number}`          | `{x: 0, y: 4}`   | Offset of the menu relative to the button.          |

## Events

| Name              | Payload | Description                         |
| ----------------- | ------- | ----------------------------------- |
| update:modelValue | `value` | Emitted when the selection changes. |
| change            | `value` | Emitted when the selection changes. |

## Smart Positioning

The menu automatically adjusts its position based on the available screen space:

- **Vertical Alignment**: Opens downwards by default. If there isn't enough space below, it automatically flips to open upwards.
- **Horizontal Alignment**:
  - **Left Alignment**: If the button is close to the left screen edge, the menu aligns to the left side of the button.
  - **Right Alignment**: If the button is close to the right screen edge, the menu aligns to the right side of the button.
  - **Center Alignment**: In standard conditions, the menu is centered relative to the button.
