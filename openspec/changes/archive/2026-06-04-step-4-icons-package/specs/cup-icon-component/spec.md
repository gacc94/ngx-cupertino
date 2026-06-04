## ADDED Requirements

### Requirement: cup-icon component exists with correct file name

The `libs/icons/src/lib/` directory SHALL contain a `cup-icon.ts` file (not `cup-icon.component.ts`) exporting a standalone Angular component.

#### Scenario: File exists

- **WHEN** listing `libs/icons/src/lib/`
- **THEN** `cup-icon.ts` exists and exports `CupIcon` class decorated with `@Component`

### Requirement: cup-icon wraps LucideIcon with correct template

The component SHALL import `LucideIcon` from `@lucide/angular` and use `<svg lucideIcon>` in its template with bindings for `name`, `size`, `strokeWidth`, `color`, and `fill`.

#### Scenario: Template uses LucideIcon

- **WHEN** reading `cup-icon.ts`
- **THEN** the template contains `<svg lucideIcon` with bindings for at least `[name]`, `[size]`, and `[strokeWidth]`

### Requirement: cup-icon has all required inputs

The component SHALL define inputs: `name` (required string), `size` (CupIconSize | number, default 'md'), `strokeWidth` (number, default 1.75), `fill` (boolean, default false), `color` (string, default 'currentColor'), `ariaLabel` (optional string).

#### Scenario: All inputs defined

- **WHEN** reading `cup-icon.ts`
- **THEN** it defines `name`, `size`, `strokeWidth`, `fill`, `color`, and `ariaLabel` as `input()` signals

### Requirement: Named sizes resolve to pixel values

The component SHALL define a `SIZE_MAP` constant mapping `'sm'` to 16, `'md'` to 24, `'lg'` to 32, and a `resolvedSize()` computed returning the numeric value.

#### Scenario: Named size resolution

- **WHEN** `size` input is `'md'`
- **THEN** `resolvedSize()` returns 24

### Requirement: .fill suffix auto-detection

The component SHALL define an `isFilled()` computed that returns true when the `fill` input is true OR when `name()` ends with `.fill`.

#### Scenario: Auto-fill via suffix

- **WHEN** `name` is `'heart.fill'`
- **THEN** `isFilled()` returns true without `[fill]="true"`

### Requirement: SF Symbol name resolution with fallback

The component SHALL define a `resolvedName()` computed that resolves: SF Symbol mapped name → SF Symbol without `.fill` mapped name → raw name.

#### Scenario: SF Symbol resolution

- **WHEN** `name` is `'house'` (SF Symbol)
- **THEN** `resolvedName()` returns `'home'` (Lucide equivalent)

#### Scenario: Raw name fallback

- **WHEN** `name` is `'some-custom-icon'` (unmapped)
- **THEN** `resolvedName()` returns `'some-custom-icon'`

### Requirement: Inline styles provide proper icon alignment

The component SHALL define inline styles with `:host { display: inline-flex; align-items: center; justify-content: center; color: var(--cup-label); line-height: 0; flex-shrink: 0; }`.

#### Scenario: Inline styles present

- **WHEN** reading `cup-icon.ts`
- **THEN** the `styles` array contains `display: inline-flex` and `line-height: 0`

### Requirement: ARIA bindings support decorative and standalone modes

The component SHALL define host bindings for `[attr.aria-hidden]`, `[attr.role]`, and `[attr.aria-label]` that adapt based on the `ariaLabel` input.

#### Scenario: Decorative mode

- **WHEN** `ariaLabel` is not set
- **THEN** host element has `aria-hidden="true"` and no role

#### Scenario: Standalone mode

- **WHEN** `ariaLabel` is `'Notifications'`
- **THEN** host element has `role="img"` and `aria-label="Notifications"`
