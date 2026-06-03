## ADDED Requirements

### Requirement: Animation duration tokens exist with 4 levels

The `_motion.scss` partial SHALL define 4 duration tokens: `--cup-duration-fast` (150ms), `--cup-duration-default` (250ms), `--cup-duration-slow` (350ms), `--cup-duration-very-slow` (500ms).

#### Scenario: Duration tokens defined

- **WHEN** reading `libs/tokens/src/lib/_motion.scss`
- **THEN** it defines `--cup-duration-fast` through `--cup-duration-very-slow` (4 tokens)

### Requirement: Easing curve tokens exist with iOS spring

The `_motion.scss` partial SHALL define 6 easing tokens including the Apple iOS navigation curve: `--cup-easing-ios` (0.32, 0.72, 0, 1), `--cup-easing-default`, `--cup-easing-ease-in`, `--cup-easing-ease-out`, `--cup-easing-ease-in-out`, `--cup-easing-spring`.

#### Scenario: Easing tokens defined

- **WHEN** reading `libs/tokens/src/lib/_motion.scss`
- **THEN** it defines `--cup-easing-ios` with `cubic-bezier(0.32, 0.72, 0, 1)` and at least 3 other easing tokens

### Requirement: Reduced motion media query exists

The `_motion.scss` partial SHALL include a `prefers-reduced-motion: reduce` media query that sets animation/transition duration to `0.01ms`.

#### Scenario: Reduced motion supported

- **WHEN** reading `libs/tokens/src/lib/_motion.scss`
- **THEN** it contains `@media (prefers-reduced-motion: reduce)` with `animation-duration: 0.01ms`
