# Button Family

Fluekit provides a set of Material Design buttons that match Flutter's button hierarchy.

- **ElevatedButton**: A filled button whose material elevates when pressed.
- **TextButton**: A button without a visible border or background.
- **OutlinedButton**: A button with an outlined border.
- **IconButton**: A button with an icon.

<script setup>
import ButtonFamilyDemo from '../demos/new_components/ButtonFamilyDemo.vue'
</script>

<div class="demo-container">
  <ButtonFamilyDemo />
</div>

## Code Example

<<< ../demos/new_components/ButtonFamilyDemo.vue

## Common Props

All buttons share these common props:

| Prop        | Type          | Default     | Description                               |
| ----------- | ------------- | ----------- | ----------------------------------------- |
| onPressed   | `() => void`  | `undefined` | Callback when the button is tapped.       |
| onLongPress | `() => void`  | `undefined` | Callback when the button is long-pressed. |
| disabled    | `boolean`     | `false`     | Whether the button is disabled.           |
| style       | `ButtonStyle` | `undefined` | Custom style to override defaults.        |

## ElevatedButton

Use an elevated button to add dimension to otherwise mostly flat layouts, e.g. in long busy lists of content, or in wide spaces.

## TextButton

Use text buttons on toolbars, in dialogs, or inline with other content but offset from that content with padding so that the button's presence is obvious.

## OutlinedButton

Outlined buttons are medium-emphasis buttons. They contain actions that are important but aren't the primary action in an app.

## IconButton

An icon button is a picture printed on a Material widget that reacts to touches.

### Specific Props (IconButton)

| Prop     | Type                  | Default | Description            |
| -------- | --------------------- | ------- | ---------------------- |
| icon     | `string \| Component` | -       | The icon to display.   |
| iconSize | `number`              | `24`    | The size of the icon.  |
| color    | `string \| Color`     | -       | The color of the icon. |
