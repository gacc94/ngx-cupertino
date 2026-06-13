# p0-color-contract Specification

## Purpose
TBD - promoted from change p0-color-contract. Update Purpose after archive.

## Requirements

### Requirement: Custom tint palettes support increased contrast variants

The core tint contract SHALL accept adaptive custom tint palettes with `light`, `dark`, `lightHighContrast`, and `darkHighContrast` values, while still allowing a bare `#hex` fallback tint for compatibility.

#### Scenario: Adaptive palette type is accepted

- **WHEN** a consumer provides a tint palette with `light` and `dark`
- **THEN** the contract accepts the palette
- **WHEN** a consumer adds `lightHighContrast` and `darkHighContrast`
- **THEN** the same contract accepts the extended palette without requiring a breaking change

#### Scenario: Fallback hex tint remains valid

- **WHEN** a consumer provides a single `#FF9500` tint value
- **THEN** the tint input remains valid as a compatibility fallback

### Requirement: ThemeService resolves custom tint using appearance and contrast

The runtime tint service SHALL resolve custom palette input against the active theme and contrast context, and SHALL update the document root tint variables when either context changes.

#### Scenario: Light contrast resolution uses the light palette value

- **WHEN** the active theme is light and contrast is default
- **THEN** the resolved tint uses the palette's `light` value

#### Scenario: Dark contrast resolution uses the dark palette value

- **WHEN** the active theme is dark and contrast is default
- **THEN** the resolved tint uses the palette's `dark` value

#### Scenario: Increased contrast re-resolves the tint

- **WHEN** the active theme is light and contrast changes to increased contrast
- **THEN** the resolved tint switches to `lightHighContrast` when provided
- **WHEN** the active theme is dark and contrast changes to increased contrast
- **THEN** the resolved tint switches to `darkHighContrast` when provided

### Requirement: Named tint behavior remains token-driven

Named tint input SHALL continue to resolve through the existing token/data-attribute path and SHALL not require custom inline palette derivation.

#### Scenario: Named tint uses dataset-driven tokens

- **WHEN** a named tint such as `blue` is selected
- **THEN** the document root uses the existing tint dataset path and token CSS rules

### Requirement: Slider thumb uses a token-backed surface color

The slider thumb SHALL not hardcode a semantic white surface color in component styles.

#### Scenario: Slider thumb background is tokenized

- **WHEN** reading the slider SCSS implementation
- **THEN** the thumb background is sourced from a token or semantic surface value rather than a raw `#fff` literal
