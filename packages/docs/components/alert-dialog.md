# AlertDialog & LiquidGlassDialog

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation. This page documents both the standard `AlertDialog` and the modern `LiquidGlassDialog`.

## Usage

<script setup>
import AlertDialogDemo from '@example/demos/new_components/AlertDialogDemo.vue'
</script>

  <AlertDialogDemo />

<<< ../demos/new_components/AlertDialogDemo.vue

## API

### Props

| Name                 | Type                  | Default                 | Description                                                    |
| :------------------- | :-------------------- | :---------------------- | :------------------------------------------------------------- |
| `visible`            | `boolean`             | `false`                 | Whether the dialog is visible.                                 |
| `title`              | `string`              | -                       | The title of the dialog.                                       |
| `content`            | `string`              | -                       | The content of the dialog.                                     |
| `barrierDismissible` | `boolean`             | `true`                  | Whether the dialog can be dismissed by tapping outside.        |
| `alignment`          | `Alignment`           | `Alignment.center`      | The alignment of the dialog within the screen.                 |
| `barrierColor`       | `string`              | `'rgba(0,0,0,0.54)'`    | The background color of the barrier overlay.                   |
| `constraints`        | `BoxConstraints`      | -                       | Custom constraints for the dialog box.                         |
| `decoration`         | `BoxDecoration`       | -                       | Custom decoration (background, border, shadow) for the dialog. |
| `size`               | `Size`                | -                       | Explicit size for the dialog.                                  |
| `actionsAlignment`   | `MainAxisAlignment`   | `MainAxisAlignment.end` | Alignment of the action buttons.                               |
| `titleAlignment`     | `Alignment`           | -                       | Alignment of the title.                                        |
| `padding`            | `EdgeInsets`          | -                       | Padding inside the dialog content area.                        |
| `titleStyle`         | `TextStyle`           | -                       | Custom text style for the title.                               |
| `titleColor`         | `string`              | -                       | Color of the title text (overridden by `titleStyle`).          |
| `titleFontSize`      | `number`              | `20`                    | Font size of the title text (overridden by `titleStyle`).      |
| `variant`            | `'material' \| 'ios'` | `'material'`            | The style variant of the dialog.                               |

### Events

| Name             | Description                                     |
| :--------------- | :---------------------------------------------- |
| `update:visible` | Emitted when the visibility changes.            |
| `close`          | Emitted when the dialog is closed or cancelled. |
| `ok`             | Emitted when the default OK button is clicked.  |

### Slots

| Name      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The content of the dialog (overrides `content` prop). |
| `actions` | The actions at the bottom of the dialog.              |

## Imperative API

You can also use the `showAlertDialog` function to display a dialog programmatically.

```typescript
import { showAlertDialog } from "fluekit";

showAlertDialog({
  title: "Confirmation",
  content: "Are you sure you want to proceed?",
  onOk: () => console.log("OK"),
  onClose: () => console.log("Closed"),
});
```

### showAlertDialog(options)

| Option    | Type         | Default | Description                                  |
| :-------- | :----------- | :------ | :------------------------------------------- |
| `onOk`    | `() => void` | -       | Callback triggered when OK button is clicked |
| `onClose` | `() => void` | -       | Callback triggered when dialog is closed     |
| `...`     | `Props`      | -       | All other props from AlertDialog component   |

# LiquidGlassDialog

A modern, glassmorphism-style dialog component designed for high-end UI experiences. It features a blur effect and smooth animations.

## API

### Props

| Name         | Type                        | Default | Description                              |
| :----------- | :-------------------------- | :------ | :--------------------------------------- |
| `modelValue` | `boolean`                   | -       | Whether the dialog is visible (v-model). |
| `title`      | `string`                    | `""`    | The title of the dialog.                 |
| `message`    | `string`                    | `""`    | The message content of the dialog.       |
| `actions`    | `LiquidGlassDialogAction[]` | `[]`    | Array of action buttons to display.      |

### Events

| Name                | Payload                          | Description                                                                    |
| :------------------ | :------------------------------- | :----------------------------------------------------------------------------- |
| `update:modelValue` | `boolean`                        | Emitted when the visibility changes.                                           |
| `action`            | `LiquidGlassDialogActionPayload` | Emitted when an action button is clicked (if no `onPressed` handler provided). |
| `close`             | -                                | Emitted when the dialog is closed.                                             |

### Types

#### LiquidGlassDialogAction

```typescript
interface LiquidGlassDialogAction {
  title: string;
  style?: "default" | "primary"; // Default: "default"
  keepOpen?: boolean; // If true, dialog won't close automatically after action
  onPressed?: (action: LiquidGlassDialogAction) => Promise<void>; // Async handler
  [key: string]: unknown;
}
```

#### LiquidGlassDialogActionPayload

```typescript
interface LiquidGlassDialogActionPayload {
  action: LiquidGlassDialogAction;
  index: number;
}
```

### Imperative API

You can use the `showLiquidGlassDialog` function to display a dialog programmatically.

```typescript
import { showLiquidGlassDialog } from "fluekit";

showLiquidGlassDialog({
  title: "Note",
  message: "Hello",
  actions: [{ title: "OK", style: "default" }],
  onClose: () => console.log("Closed"),
});
```
