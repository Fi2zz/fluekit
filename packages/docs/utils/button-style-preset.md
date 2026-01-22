# ButtonStylePreset

A utility class that provides common button style presets for both Material Design 3 and iOS (Cupertino).

## Usage

```typescript
import { ButtonStylePreset, Button } from 'fluekit';

// Material Filled Button
<Button :style="ButtonStylePreset.materialFilled">Click Me</Button>
```

## Material Design 3 Presets

Based on the [Material Design 3 Button Specs](https://m3.material.io/components/buttons/specs).

| Preset             | Description                                    | Visual Style                                            |
| ------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| `materialFilled`   | High emphasis, best for key actions.           | Solid primary color background, white text, pill shape. |
| `materialTonal`    | Medium emphasis, alternative to filled.        | Light primary container background, primary text.       |
| `materialOutlined` | Medium emphasis, best for secondary actions.   | Transparent background, primary border, primary text.   |
| `materialElevated` | Separation from background.                    | Surface color background, shadow elevation.             |
| `materialText`     | Low emphasis, best for less prominent actions. | Transparent background, no border, primary text.        |

## iOS (Cupertino) Presets

Based on [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/buttons).

| Preset                 | Description                            | Visual Style                                         |
| ---------------------- | -------------------------------------- | ---------------------------------------------------- |
| `cupertinoFilled`      | Standard iOS filled button.            | System blue background, white text, rounded corners. |
| `cupertinoTinted`      | Secondary iOS button.                  | Light gray/tinted background, system blue text.      |
| `cupertinoPlain`       | Text-only button (like nav bar items). | Transparent background, system blue text, no border. |
| `cupertinoDestructive` | Destructive actions.                   | System red background, white text.                   |
