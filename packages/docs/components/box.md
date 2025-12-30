# Box

A convenience widget that combines common painting, positioning, and sizing widgets.
It is similar to `Container` but allows passing decoration properties (border, borderRadius, boxShadow, etc.) directly as props, without needing a `BoxDecoration` object.

## Usage

<script setup>
import BasicBox from '@example/demos/box/BasicBox.vue'
</script>

<div class="demo-box">
  <BasicBox />
</div>

<<< ../demos/box/BasicBox.vue

## API

### Props

| Name           | Type                      | Default       | Description                               |
| :------------- | :------------------------ | :------------ | :---------------------------------------- |
| `width`        | `number \| string`        | -             | Width of the box.                         |
| `height`       | `number \| string`        | -             | Height of the box.                        |
| `padding`      | `EdgeInsets`              | -             | Empty space to inscribe inside the box.   |
| `margin`       | `EdgeInsets`              | -             | Empty space to surround the box.          |
| `color`        | `string`                  | -             | Background color.                         |
| `border`       | `Border`                  | -             | Border around the box.                    |
| `borderRadius` | `BorderRadius`            | -             | Border radius of the box.                 |
| `boxShadow`    | `BoxShadow[]`             | -             | Shadows to cast behind the box.           |
| `shape`        | `'rectangle' \| 'circle'` | `'rectangle'` | Shape of the box.                         |
| `alignment`    | `Alignment`               | -             | Align the child within the box.           |
| `clipBehavior` | `Clip`                    | `'none'`      | The clip behavior when decoration is set. |
| `gradient`     | `string`                  | -             | Background gradient (CSS string).         |
| `image`        | `DecorationImage`         | -             | Background image.                         |
