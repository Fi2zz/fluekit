# Changelog

All notable changes to this project will be documented in this file.

## [2.3.1] - 2026-01-23

### Features

- **Animation**: Add `AnimationWidget` component and `Animation` utility helper for CSS keyframe animations.
- **Container**: Fix external style/class merging issue.

## [2.3.0] - 2026-01-22

### Features

- **Toast**: Add `Toast` component and utility for displaying notifications.
- **Modal**: Add `Modal` component for generic overlays.

## [2.2.9] - 2026-01-22

### Features

- **Icons**: Add `monitor` icon.

## [2.2.8] - 2026-01-22

### Features

- **TextButtonWithIcon**: Add new component `TextButtonWithIcon` that supports icon and text layout.

## [2.2.7] - 2026-01-22

### Bug Fixes

- **ButtonStylePreset**: Fix `copyWith` usage by replacing it with object spread for `TextStyle` merging.

## [2.2.6] - 2026-01-22

### Features

- **Styles**:
  - Add `TextStylePreset` for Material Design 3 and iOS typography presets.
  - Add `ButtonStylePreset` for Material Design 3 and iOS button style presets.
- **Documentation**:
  - Add API reference docs for `TextStylePreset` and `ButtonStylePreset`.

## [2.2.5] - 2026-01-22

### Refactor

- **Chip**:
  - Extract props and emits to `ChipProps.ts` for better type reuse.
  - Update `ActionChip` and `ChoiceChip` to use shared types.
  - Support passing custom `decoration` and `labelStyle` to `Chip`.
  - Add `selectedTextColor` prop to `ChoiceChip`.

## [2.2.4] - 2026-01-22

### Features

- **Chip**:
  - Add `size` prop support (`small`, `medium`, `large`).
  - Add `width` and `height` props for fixed dimensions.
  - Automatically center content when fixed dimensions are used.

## [2.2.3] - 2026-01-22

### Features

- **RatingBar**:
  - Add new `RatingBar` component with support for half-stars, readonly mode, and custom styling.
  - Implement hover preview for interactive rating.
- **Icons**:
  - Add rounded star icons (`star`, `starBorder`, `starHalf`).

## [2.2.2] - 2026-01-22

### Features

- **InputDecoration**:
  - Add `constraints` property to control the size of the input container.
  - Add `errorMaxLines` and `helperMaxLines` to control text truncation.
  - Add `helperConstraints` and `errorConstraints` for explicit size control of helper/error text.
  - Add `alwaysShowError` to reserve space for error text even when empty.
  - Add `errorTextAlign` and `helperTextAlign` for text alignment control.

## [2.2.0] - 2026-01-22

### Features

- **TextField**:
  - Add comprehensive icon support: `icon`, `prefixIcon`, `suffixIcon` slots and props.
  - Enhance layout controls: `isDense`, `isCollapsed`, `contentPadding`.
  - Add `FloatingLabelBehavior` (`always`, `auto`, `never`) for better label control.
  - Support `EdgeInsets` in `contentPadding`.
  - Fix label positioning when using `prefixIcon`.
  - Add `counterText` and `helperText` support.
  - Add styling props: `labelStyle`, `floatingLabelStyle`, `hintStyle`, `helperStyle`, `errorStyle`.
- **InputDecoration**:
  - Refactor to support usage as a factory function (e.g., `InputDecoration({...})`).
  - Add missing properties for icons, borders (`enabledBorder`, `focusedBorder`, etc.), and styles.
- **Icons**:
  - Add `checkCircle` and `person` icons to the built-in icon set.

### Documentation

- **TextField**:
  - Merge `InputDecoration` documentation into `TextField` page.
  - Add new examples: `IconsDemo` showing various icon configurations.
  - Update API reference with all new properties.

## [2.1.0] - 2026-01-21

### Features

- **BackdropFilter**:
  - Add `BackdropFilter` widget to apply filters (e.g., blur) to existing content.
  - Add `ImageFilter` helper class.
- **BoxDecoration**:
  - Support `backdropFilter` property for easier background blur effects in `Container`.

### Documentation

- **BackdropFilter**: Add detailed documentation and interactive demos.

## [1.6.2] - 2026-01-15

### Features

- **Button**: Support `text` prop as a shorthand for default slot content.

## [1.6.1] - 2026-01-15

### Bug Fixes

- **General**: Version bump.

## [1.5.77] - 2026-01-12

### Features

- **Slider**:
  - Update to iOS style by default with `variant` prop support (`ios` | `material`).
  - Support negative values for `min`, `max` and `value`.
  - Refactor Thumb implementation to use `Positioned` instead of style attributes.
- **RangeSlider**:
  - Update to iOS style by default with `variant` prop support (`ios` | `material`).
  - Support negative values for `min`, `max` and `value`.
  - Refactor Thumb implementation to use `Positioned` instead of style attributes.

### Refactor

- **Container**: Remove support for `style` attribute to enforce `Positioned` or other layout components for positioning.

### Documentation

- **Button**: Refine documentation structure and add detailed examples.
- **Slider**: Add negative value usage examples.

## [1.5.0] - 2025-12-30

### Features

- **Box**: New convenience component for styling and positioning.
- **Card**: New Material Design card component.
- **Flex**: Export `CrossAxisAlignment` and `MainAxisAlignment` for easier usage.

## [1.4.1] - 2025-12-26

### Bug Fixes

- **Utils**: Export `StackFit` from main entry to fix missing export.

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
