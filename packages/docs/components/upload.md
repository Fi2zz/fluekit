# Upload

File upload component.

## Basic Usage

<script setup>
import UploadDemo from '@example/demos/new_components/UploadDemo.vue'
</script>

<div class="demo-box">
  <UploadDemo />
</div>

<<< ../demos/new_components/UploadDemo.vue

## Props

| Name         | Type                                          | Default | Description                               |
| ------------ | --------------------------------------------- | ------- | ----------------------------------------- |
| accept       | `string`                                      | -       | File types to accept                      |
| multiple     | `boolean`                                     | `false` | Whether to support multiple selection     |
| disabled     | `boolean`                                     | `false` | Whether to disable                        |
| maxCount     | `number`                                      | -       | Max number of files                       |
| request      | `(file: UploadFile) => Promise<any>`          | -       | Custom upload request                     |
| validate     | `(file: File) => boolean \| Promise<boolean>` | -       | File validation function                  |
| showFileList | `boolean`                                     | `true`  | Whether to show file list                 |
| name         | `string`                                      | `file`  | The name of the file field in the request |

## Events

| Name     | Description                            | Parameters                                 |
| -------- | -------------------------------------- | ------------------------------------------ |
| change   | Triggered when file list changes       | `(files: UploadFile[])`                    |
| remove   | Triggered when file is removed         | `(file: UploadFile)`                       |
| exceed   | Triggered when limit is exceeded       | -                                          |
| success  | Triggered when upload succeeds         | `(response: any, file: UploadFile)`        |
| error    | Triggered when upload fails            | `(error: Error, file: UploadFile)`         |
| progress | Triggered when upload progress updates | `(event: ProgressEvent, file: UploadFile)` |
