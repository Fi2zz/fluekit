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

<script setup>
import BasicDemo from '../demos/toast/BasicDemo.vue';
</script>

<BasicDemo />
<<< ../demos/toast/BasicDemo.vue

## API

### Toast.show(message, options)

| Parameter | Type           | Default | Description                  |
| --------- | -------------- | ------- | ---------------------------- |
| `message` | `string`       | -       | The text message to display. |
| `options` | `ToastOptions` | `{}`    | Configuration options.       |

### Convenience Methods

All convenience methods accept `(message, options)` and set the appropriate `type` and `icon`.

- `Toast.success(message, options)`
- `Toast.failed(message, options)`
- `Toast.error(message, options)`
- `Toast.info(message, options)`
- `Toast.warning(message, options)`
- `Toast.loading(message, options)`

### ToastOptions

| Property          | Type            | Default                | Description                                                               |
| ----------------- | --------------- | ---------------------- | ------------------------------------------------------------------------- |
| `type`            | `ToastType`     | -                      | Type of toast: `success`, `failed`, `error`, `info`, `warning`, `loading` |
| `duration`        | `number`        | `2000`                 | Duration in milliseconds. Set to 0 to keep open until hidden manually.    |
| `position`        | `ToastPosition` | `'bottom-center'`      | Where to display the toast.                                               |
| `icon`            | `string`        | `undefined`            | Icon path/data to display. Automatically set if `type` is provided.       |
| `zIndex`          | `number`        | `2000`                 | Z-index of the toast.                                                     |
| `backgroundColor` | `string`        | `'rgba(0, 0, 0, 0.8)'` | Background color.                                                         |
| `textColor`       | `string`        | `'#ffffff'`            | Text color.                                                               |

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
