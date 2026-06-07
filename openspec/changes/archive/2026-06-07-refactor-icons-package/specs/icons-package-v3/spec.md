## ADDED Requirements

### Requirement: External SCSS with token validation
The `cup-icon` component SHALL use `styleUrl: './cup-icon.scss'` instead of inline styles. The SCSS SHALL use `@use '../../../../tokens/src/lib/index' as t` for `t.token()` access.

#### Scenario: SCSS resolves token values correctly
- **WHEN** cup-icon renders with default size
- **THEN** `:host` has `width: var(--cup-icon-size)` and `height: var(--cup-icon-size)`

### Requirement: Auto-derived icon registration
The `provideCupIcons()` function SHALL read unique Lucide names from `SF_SYMBOL_MAP` values, look them up in `LUCIDE_ICONS`, and register them via `provideLucideIcons()`.

#### Scenario: Adding a new SF Symbol auto-registers its Lucide icon
- **WHEN** a new entry is added to `SF_SYMBOL_MAP` mapping to an existing key in `LUCIDE_ICONS`
- **THEN** `provideCupIcons()` automatically includes that icon without any other code changes

### Requirement: Dev-mode warning for unregistered icons
`provideCupIcons()` SHALL log a `console.warn` in dev mode when an SF Symbol maps to a Lucide name not found in `LUCIDE_ICONS`.

#### Scenario: Missing icon triggers dev warning
- **WHEN** `SF_SYMBOL_MAP` references a name not in `LUCIDE_ICONS` and `ngDevMode` is true
- **THEN** a warning is logged with the missing icon name

## ADDED Requirements

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
