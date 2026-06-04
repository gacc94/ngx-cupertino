# core-constants Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: CupTints constant is defined with as const

The `libs/core/src/lib/constants/colors.ts` file SHALL export a `CupTints` constant using `as const` with 13 tint color entries, each containing `light` and `dark` hex values.

#### Scenario: CupTints has 13 color entries

- **WHEN** reading `colors.ts`
- **THEN** `CupTints` contains exactly 13 keys: BLUE, GREEN, INDIGO, ORANGE, PINK, PURPLE, RED, TEAL, YELLOW, GRAY, MINT, CYAN, BROWN
- **THEN** each key has `{ light: string, dark: string }` with valid hex colors

#### Scenario: CupTints is readonly

- **WHEN** attempting to modify `CupTints` at compile time
- **THEN** TypeScript rejects the assignment due to `as const` and `readonly` inference

### Requirement: CupTintName type is exported

The `colors.ts` file SHALL export a `CupTintName` type equal to `keyof typeof CupTints`.

#### Scenario: Type resolves to union of tint names

- **WHEN** using `CupTintName` in a type annotation
- **THEN** it accepts only the 13 tint name string literals

### Requirement: CupSizes constant is defined with as const

The `libs/core/src/lib/constants/sizes.ts` file SHALL export a `CupSizes` constant with `SMALL`, `MEDIUM`, `LARGE` keys mapped to lowercase size strings.

#### Scenario: CupSizes map correctly

- **WHEN** reading `sizes.ts`
- **THEN** `CupSizes.SMALL` is `'small'`, `CupSizes.MEDIUM` is `'medium'`, `CupSizes.LARGE` is `'large'`

### Requirement: CupSize type is exported

The `sizes.ts` file SHALL export a `CupSize` type equal to the union of all CupSizes values.

#### Scenario: CupSize union matches values

- **WHEN** using `CupSize` as a type
- **THEN** it accepts `'small' | 'medium' | 'large'`

### Requirement: CupButtonVariants constant is defined

The `libs/core/src/lib/constants/variants.ts` file SHALL export `CupButtonVariants` with keys LIQUID_GLASS, TINTED, FILLED, PLAIN, each mapping to the corresponding CSS class name string.

#### Scenario: CupButtonVariants values

- **WHEN** reading `variants.ts`
- **THEN** `CupButtonVariants.LIQUID_GLASS` is `'liquid-glass'`, `TINTED` is `'tinted'`, `FILLED` is `'filled'`, `PLAIN` is `'plain'`

### Requirement: CupCardVariants constant is defined

The `variants.ts` file SHALL export `CupCardVariants` with keys ELEVATED, OUTLINED, LIQUID_GLASS.

#### Scenario: CupCardVariants values

- **WHEN** reading `variants.ts`
- **THEN** `CupCardVariants.ELEVATED` is `'elevated'`, `OUTLINED` is `'outlined'`, `LIQUID_GLASS` is `'liquid-glass'`

### Requirement: Variant types are exported

The `variants.ts` file SHALL export `CupButtonVariant` and `CupCardVariant` types as unions of their respective constant values.

#### Scenario: Types resolve correctly

- **WHEN** using `CupButtonVariant` in a component input
- **THEN** it accepts `'liquid-glass' | 'tinted' | 'filled' | 'plain'`
- **WHEN** using `CupCardVariant`
- **THEN** it accepts `'elevated' | 'outlined' | 'liquid-glass'`

