# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2025-12-26

### Features

- **ImageProvider**:
  - Add `MemoryImage` to support Base64 strings and Blob objects.
  - Export `MemoryImage` from main entry.
  - Enhance `AssetImage` path handling to ignore absolute paths and special protocols (data:, blob:, http:).
- **TextField**:
  - Add support for auto-growing height in multi-line mode (`minLines`, `maxLines`).
  - Add new props: `maxLength` (with counter), `textAlign`, `textInputAction`, `textCapitalization`, `autocorrect`.
- **Utils**:
  - Export `setAssetBaseURL` and `createAssetImage` for better asset management.

### Bug Fixes

- **TextField**:
  - Fix `labelText` overlapping with `hintText`.
  - Fix `labelText` overlapping with `prefixText` (dynamic label offset).
- **Docs**:
  - Fix documentation styles to align with VitePress standards.
  - Add missing documentation for utils (`ButtonStyle`, `ImageProvider`, `InputDecoration`).

### Refactor

- **ImageProvider**:
  - Remove unused `scale` property from `ImageProvider` interface.
  - Remove unused `headers` and `scale` from `NetworkImage`.
  - **BREAKING CHANGE**: `NetworkImage` no longer accepts an options object as the second argument. `ImageProvider` interface no longer has `scale` property.
