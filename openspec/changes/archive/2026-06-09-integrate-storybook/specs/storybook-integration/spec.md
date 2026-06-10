## ADDED Requirements

### Requirement: Storybook serves successfully
The project SHALL have Storybook configured and running for the `ui` library.

#### Scenario: storybook serve works
- **WHEN** `bun nx storybook ui` is executed
- **THEN** Storybook starts without errors and is accessible in the browser

### Requirement: SCSS tokens are loaded globally
The project SHALL load `@ngx-cupertino/tokens` CSS custom properties in all stories.

#### Scenario: Tokens are available in stories
- **WHEN** a story renders a component
- **THEN** the component displays correct colors from `--cup-tint`, `--cup-label`, etc.
- **AND** the decorator wrapper applies `data-mode="light"` and `data-tint="blue"`

### Requirement: Stories exist for all 6 components
The project SHALL have CSF3 stories for CupButton, CupToggle, CupTextField, CupSlider, CupStepper, and CupProgress.

#### Scenario: CupButton stories
- **WHEN** Storybook is running
- **THEN** CupButton stories are visible in the sidebar under Components/Button
- **AND** argTypes include variant (select), size (select), disabled (boolean)

#### Scenario: CupToggle stories
- **WHEN** Storybook is running
- **THEN** CupToggle stories are visible with checked, disabled, and size controls

### Requirement: Interaction tests are configured
The project SHALL have `--interactionTests=true` configured in the Storybook setup.

#### Scenario: test-storybook target exists
- **WHEN** `bun nx test-storybook ui` is executed
- **THEN** interaction tests run without errors

### Requirement: GitHub Pages deploy workflow exists
The project SHALL have a `.github/workflows/storybook.yml` file for automatic deploy.

#### Scenario: Workflow deploys on push to main
- **WHEN** a push is made to main
- **THEN** the Storybook static build is deployed to GitHub Pages
