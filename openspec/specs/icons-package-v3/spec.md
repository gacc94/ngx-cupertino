# icons-package-v3 Specification

## Purpose
TBD - created by archiving change refactor-icons-package. Update Purpose after archive.
## Requirements
### Requirement: Host size classes on cup-icon
The `cup-icon` component SHALL apply `.cup-small` and `.cup-large` host classes based on the `size()` signal, matching the cup-button pattern. The `:host` SHALL have explicit `width` and `height` via `t.token('icon-size')`.

#### Scenario: Small size applies cup-small class
- **WHEN** `size = 'sm'`
- **THEN** host gets class `.cup-small` with `width: var(--cup-icon-size-sm)`

#### Scenario: Default size has explicit dimensions
- **WHEN** `size = 'md'`
- **THEN** `:host` has `width: var(--cup-icon-size)` and `height: var(--cup-icon-size)`

### Requirement: replaceAll for fill suffix
The `resolvedName()` computed SHALL use `replaceAll('.fill', '')` instead of `replace('.fill', '')` to correctly handle edge cases with multiple `.fill` occurrences in SF Symbol names.

#### Scenario: Single .fill suffix is stripped
- **WHEN** `name = 'heart.fill'`
- **THEN** `resolvedName()` returns the mapped Lucide name from `SF_SYMBOL_MAP['heart']`

### Requirement: ChangeDetectionStrategy.OnPush
The `cup-icon` component SHALL use `ChangeDetectionStrategy.OnPush` for consistency with all other components in the library.

#### Scenario: Component uses OnPush
- **WHEN** component is created
- **THEN** `ChangeDetectionStrategy.OnPush` is active

### Requirement: Type-safe LUCIDE_ICONS map
The `LUCIDE_ICONS` constant SHALL be typed as `Record<string, IconNode>` (or equivalent Lucide type) instead of `Record<string, unknown>`.

#### Scenario: IDE validates icon imports
- **WHEN** a developer adds an entry to `LUCIDE_ICONS`
- **THEN** the IDE validates it is a valid Lucide icon component type

### Requirement: Missing SF Symbol mappings added
The SF Symbol map SHALL include entries for `arrow.right`, `arrow.left`, `minus.circle`, `minus.circle.fill`, and `heart.crack`.

#### Scenario: Arrow right renders correctly
- **WHEN** `<cup-icon name="arrow.right" />` is used
- **THEN** the Lucide `arrow-right` icon renders

