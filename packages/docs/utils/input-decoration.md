# InputDecoration

The `InputDecoration` class is used to configure the visual appearance of input fields, such as `TextField`. It allows you to define labels, borders, icons, hints, error messages, and more.

## Usage

Pass an `InputDecoration` object to the `decoration` prop of a `TextField` component.

<script setup>
import InputDecorationDemo from '../demos/new_components/InputDecorationDemo.vue'
</script>
<div class="demo-container">
  <InputDecorationDemo />
</div>

## Code Example

<<< ../demos/new_components/InputDecorationDemo.vue

## Properties

| Property                | Type                    | Description                                                                                        |
| ----------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `labelText`             | `string`                | Text that describes the input field.                                                               |
| `labelStyle`            | `TextStyle`             | Style for the label text.                                                                          |
| `helperText`            | `string`                | Text that provides context about the input's value, such as how the value will be used.            |
| `helperStyle`           | `TextStyle`             | Style for the helper text.                                                                         |
| `hintText`              | `string`                | Text that suggests what sort of input the field accepts.                                           |
| `hintStyle`             | `TextStyle`             | Style for the hint text.                                                                           |
| `errorText`             | `string`                | Text that appears below the input when the input content is invalid.                               |
| `errorStyle`            | `TextStyle`             | Style for the error text.                                                                          |
| `prefixIcon`            | `string`                | An icon that appears before the prefix or input text, inside the border.                           |
| `prefixText`            | `string`                | Text that appears before the input text, inside the border.                                        |
| `suffixIcon`            | `string`                | An icon that appears after the suffix or input text, inside the border.                            |
| `suffixText`            | `string`                | Text that appears after the input text, inside the border.                                         |
| `counterText`           | `string`                | Text to place below the line as a character count.                                                 |
| `filled`                | `boolean`               | Whether the decoration's container is filled with `fillColor`.                                     |
| `fillColor`             | `Color`                 | The color to fill the decoration's container with, if `filled` is true.                            |
| `border`                | `InputBorder`           | The border to display when the InputDecorator does not have the focus and is not showing an error. |
| `enabledBorder`         | `InputBorder`           | The border to display when the InputDecorator is enabled and is not showing an error.              |
| `focusedBorder`         | `InputBorder`           | The border to display when the InputDecorator has the focus and is not showing an error.           |
| `errorBorder`           | `InputBorder`           | The border to display when the InputDecorator is showing an error.                                 |
| `focusedErrorBorder`    | `InputBorder`           | The border to display when the InputDecorator has the focus and is showing an error.               |
| `disabledBorder`        | `InputBorder`           | The border to display when the InputDecorator is disabled and is not showing an error.             |
| `contentPadding`        | `EdgeInsets`            | The padding for the input decoration's container.                                                  |
| `isDense`               | `boolean`               | Whether the input decoration is dense.                                                             |
| `floatingLabelBehavior` | `FloatingLabelBehavior` | Defines how the floating label behaves.                                                            |
| `icon`                  | `string`                | An icon to show before the input field and outside of the decoration's container.                  |

## Borders

The `border` property (and related properties like `enabledBorder`, `focusedBorder`, etc.) accepts an `InputBorder` object. You can create these objects using helper functions or use the pre-defined `none` constant.

### OutlineInputBorder

Creates a rounded rectangle border.

```ts
InputDecoration({
  border: OutlineInputBorder({
    borderRadius: BorderRadius.circular(8),
    borderSide: BorderSide({ color: Colors.blue, width: 2 }),
  }),
});
```

### UnderlineInputBorder

Creates a horizontal line at the bottom. This is the default border type for `TextField`.

```ts
InputDecoration({
  border: UnderlineInputBorder({
    borderSide: BorderSide({ color: Colors.grey, width: 1 }),
  }),
});
```

### InputBorder.none

Removes the border completely.

```ts
InputDecoration({
  border: InputBorder.none,
});
```

## FloatingLabelBehavior

- **auto**: The label floats when the input is focused or has content. (Default)
- **always**: The label always floats above the input.
- **never**: The label never floats.
