# Radio

A material design radio button.

## Usage

<script setup>
import RadioDemo from '@example/demos/new_components/RadioDemo.vue'
</script>

<div class="demo-box">
  <RadioDemo />
</div>

<<< ../demos/new_components/RadioDemo.vue

## API

### Props

| Name            | Type                | Default     | Description                                                |
| :-------------- | :------------------ | :---------- | :--------------------------------------------------------- |
| `value`         | `any`               | -           | The value represented by this radio button.                |
| `groupValue`    | `any`               | -           | The currently selected value for a group of radio buttons. |
| `activeColor`   | `string`            | `'#007AFF'` | The color to use when this radio button is selected.       |
| `fillColor`     | `string`            | -           | The background color of the radio button.                  |
| `labelPosition` | `'left' \| 'right'` | `'right'`   | The position of the label relative to the radio.           |
| `hideIcon`      | `boolean`           | `false`     | Whether to hide the radio icon.                            |

### Slots

| Name      | Description        |
| :-------- | :----------------- |
| `default` | The label content. |

### Events

| Name                | Description                                      |
| :------------------ | :----------------------------------------------- |
| `update:groupValue` | Emitted when the user selects this radio button. |
| `change`            | Emitted when the user selects this radio button. |

## RadioGroup

A wrapper for grouping radio buttons.

### Props

| Name          | Type      | Default | Description                                   |
| :------------ | :-------- | :------ | :-------------------------------------------- |
| `value`       | `any`     | -       | The currently selected value (v-model).       |
| `activeColor` | `string`  | -       | The color to use for all radios in the group. |
| `disabled`    | `boolean` | `false` | Whether all radios in the group are disabled. |

### Events

| Name           | Description                     |
| :------------- | :------------------------------ |
| `update:value` | Emitted when the value changes. |
| `change`       | Emitted when the value changes. |

## RadioListTile

A list tile that displays a radio button.

### Props

| Name              | Type                      | Default     | Description                                           |
| :---------------- | :------------------------ | :---------- | :---------------------------------------------------- |
| `value`           | `any`                     | -           | The value represented by this radio button.           |
| `groupValue`      | `any`                     | -           | The currently selected value.                         |
| `title`           | `string`                  | -           | The primary content of the list tile.                 |
| `subtitle`        | `string`                  | -           | Additional content displayed below the title.         |
| `secondary`       | `Component`               | -           | A widget to display on the opposite side of the tile. |
| `controlAffinity` | `'leading' \| 'trailing'` | `'leading'` | Where to place the radio relative to the text.        |
| `activeColor`     | `string`                  | -           | The color to use when this radio button is selected.  |
| `tileColor`       | `string`                  | -           | The color of the list tile.                           |
| `selected`        | `boolean`                 | `false`     | Whether the list tile is selected.                    |
| `selectedColor`   | `string`                  | -           | The color of the text and icon when selected.         |
| `contentPadding`  | `EdgeInsets`              | -           | The padding of the list tile content.                 |
| `enabled`         | `boolean`                 | `true`      | Whether the list tile is interactive.                 |
| `dense`           | `boolean`                 | `false`     | Whether the list tile is part of a dense list.        |
| `hideIcon`        | `boolean`                 | `false`     | Whether to hide the radio icon.                       |

### Slots

| Name        | Description                                |
| :---------- | :----------------------------------------- |
| `title`     | Custom title content.                      |
| `subtitle`  | Custom subtitle content.                   |
| `secondary` | Custom content on the opposite side.       |
| `leading`   | Custom leading content (overrides radio).  |
| `trailing`  | Custom trailing content (overrides radio). |
