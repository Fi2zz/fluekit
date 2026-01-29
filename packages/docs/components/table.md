# Table

A table component for displaying rows of data.

## Basic Usage

<script setup>
import BasicDemo from '@example/demos/table/BasicDemo.vue'
</script>

<div class="demo-box">
  <BasicDemo />
</div>

<<< ../demos/table/BasicDemo.vue

<!-- <demo src="../demos/table/BasicDemo.vue"></demo> -->

## API

### Table Props

| Property   | Type                                         | Default | Description                       |
| ---------- | -------------------------------------------- | ------- | --------------------------------- |
| columns    | `TableColumn[]`                              | `[]`    | Columns configuration             |
| dataSource | `any[]`                                      | `[]`    | Data array                        |
| rowKey     | `string \| ((row: any) => string \| number)` | -       | Row key                           |
| border     | `boolean`                                    | `true`  | Whether to show border            |
| stripe     | `boolean`                                    | `false` | Whether to show stripe            |
| fixed      | `boolean`                                    | `false` | Whether to use fixed table layout |
| showHeader | `boolean`                                    | `true`  | Whether to show header            |
| width      | `number \| string`                           | -       | Container width                   |
| height     | `number \| string`                           | -       | Container height                  |
| margin     | `EdgeInsets`                                 | -       | Container margin                  |
| padding    | `EdgeInsets`                                 | -       | Container padding                 |
| decoration | `BoxDecoration`                              | -       | Container decoration              |

### TableColumn

| Property | Type                            | Description      |
| -------- | ------------------------------- | ---------------- |
| title    | `string`                        | Column title     |
| key      | `string`                        | Column key       |
| width    | `number \| string`              | Column width     |
| align    | `'left' \| 'center' \| 'right'` | Column alignment |

### Slots

| Name   | Description                                     |
| ------ | ----------------------------------------------- |
| header | Custom header cell content. Scope: `{ column }` |
| [key]  | Custom cell content. Scope: `{ record, index }` |
| empty  | Custom empty content                            |

### Events

| Name     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| rowClick | Triggers when a row is clicked. Callback: `(row: any, index: number)` |
