# Toast

A lightweight toast notification component that can be displayed programmatically.

## Usage

```typescript
import { Toast, Icons } from "fluekit";

// Basic usage
Toast.show("Hello World");

// With options
Toast.show("Success!", {
  position: "top-center",
  duration: 3000,
  icon: Icons.checkCircle,
  backgroundColor: "#4CAF50",
});
```

## Examples

### Interactive Demo

<script setup>
import BasicDemo from '../demos/toast/BasicDemo.vue';
</script>

<BasicDemo />

## API

### Toast.show(message, options)

| Parameter | Type           | Default | Description                  |
| --------- | -------------- | ------- | ---------------------------- |
| `message` | `string`       | -       | The text message to display. |
| `options` | `ToastOptions` | `{}`    | Configuration options.       |

### ToastOptions

| Property          | Type            | Default                | Description                                                            |
| ----------------- | --------------- | ---------------------- | ---------------------------------------------------------------------- |
| `duration`        | `number`        | `2000`                 | Duration in milliseconds. Set to 0 to keep open until hidden manually. |
| `position`        | `ToastPosition` | `'bottom-center'`      | Where to display the toast.                                            |
| `icon`            | `string`        | `undefined`            | Icon path/data to display.                                             |
| `zIndex`          | `number`        | `2000`                 | Z-index of the toast.                                                  |
| `backgroundColor` | `string`        | `'rgba(0, 0, 0, 0.8)'` | Background color.                                                      |
| `textColor`       | `string`        | `'#ffffff'`            | Text color.                                                            |

### ToastPosition

Available positions:

- `center`
- `top-center`
- `bottom-center`
- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`
- `center-left`
- `center-right`

### Toast.hide()

Hides the currently visible toast immediately.
