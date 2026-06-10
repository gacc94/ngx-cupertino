## ADDED Requirements

### Requirement: Storybook static build works
The project SHALL be able to build a static Storybook site.

#### Scenario: build-storybook succeeds
- **WHEN** `bun nx build-storybook ui` is executed
- **THEN** a static Storybook site is generated in `dist/storybook/ui`
