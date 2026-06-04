## ADDED Requirements

### Requirement: CupProgress uses custom element selector

The `libs/ui/src/lib/progress/cup-progress.ts` file SHALL export a component with `selector: 'cup-progress'`.

#### Scenario: Selector is cup-progress

- **WHEN** reading `cup-progress.ts`
- **THEN** `selector` is `'cup-progress'`

### Requirement: CupProgress is display-only (no CVA)

The component SHALL NOT extend `CupFormControl`. It is a display-only component.

#### Scenario: No CVA base class

- **WHEN** reading `cup-progress.ts`
- **THEN** the class does not extend `CupFormControl`

### Requirement: CupProgress has value, max, type inputs

The component SHALL accept `value` (default 0), `max` (default 100), `type` (`'linear' | 'circular'`, default `'linear'`), `size`, and `label` inputs.

#### Scenario: Default is linear

- **WHEN** `<cup-progress [value]="50">` is rendered
- **THEN** a linear progress bar with 50% fill is displayed

#### Scenario: Circular variant renders SVG

- **WHEN** `<cup-progress type="circular" [value]="75">` is rendered
- **THEN** an SVG ring with stroke-dasharray reflecting 75% is rendered

### Requirement: CupProgress has percentage computed signal

The component SHALL expose `percentage` as `computed(() => (value() / max()) * 100)`.

#### Scenario: Percentage calculation

- **WHEN** `value()` is 25 and `max()` is 100
- **THEN** `percentage()` returns `25`

### Requirement: CupProgress has ARIA progressbar role

The component SHALL set `role="progressbar"` on the progress element with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax` bound to inputs.

#### Scenario: ARIA progressbar attributes

- **WHEN** `<cup-progress [value]="60" [max]="100">` is rendered
- **THEN** the progress element has `role="progressbar"`, `aria-valuenow="60"`, `aria-valuemin="0"`, `aria-valuemax="100"`

### Requirement: CupProgress displays label

When `label` is set, the component SHALL display the label text and current percentage.

#### Scenario: Label with percentage

- **WHEN** `<cup-progress [value]="30" label="Uploading">` is rendered
- **THEN** "Uploading — 30%" text is displayed

### Requirement: CupProgress has no keyboard interaction

The component SHALL NOT respond to keyboard events. It is display-only.

#### Scenario: No keyboard handling

- **WHEN** reading `cup-progress.ts`
- **THEN** there are no keyboard event handlers
