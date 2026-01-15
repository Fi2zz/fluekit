# Icon

A graphical icon widget drawn with a glyph from a font described in an IconData, or an SVG path/component.

## Usage

<script setup>
import IconDemo from '@example/demos/new_components/IconDemo.vue'
</script>

<div class="demo-box">
  <IconDemo />
</div>

<<< ../demos/new_components/IconDemo.vue

## API

### Props

| Name            | Type                  | Default   | Description                                                                                                                                                         |
| :-------------- | :-------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `icon`          | `string \| Component` | -         | The icon to display. Can be: <br> - A Vue Component (e.g. imported from .svg file) <br> - A string containing SVG path data (d attribute)                           |
| `size`          | `number \| string`    | `24`      | The size of the icon in logical pixels.                                                                                                                             |
| `color`         | `string`              | `inherit` | The color to use when drawing the icon. If not specified, it defaults to the current text color. <br> This color applies to both `fill` and `color` CSS properties. |
| `semanticLabel` | `string`              | -         | Semantic label for accessibility.                                                                                                                                   |

### Slots

| Name      | Description                                                                                             |
| :-------- | :------------------------------------------------------------------------------------------------------ |
| `default` | Custom content (usually an `<svg>` element) to render inside the Icon container. Overrides `icon` prop. |
