# project-license Specification

## Purpose
TBD - created by archiving change add-readme-license. Update Purpose after archive.
## Requirements
### Requirement: MIT LICENSE file exists at workspace root

The workspace SHALL contain a valid MIT License file named `LICENSE` (no extension) at the repository root.

#### Scenario: LICENSE file present

- **WHEN** listing workspace root files
- **THEN** a file named `LICENSE` exists with valid MIT License text

#### Scenario: LICENSE contains required elements

- **WHEN** reading the `LICENSE` file
- **THEN** it contains the text "MIT License", "Permission is hereby granted, free of charge", and the copyright notice

### Requirement: Root package.json declares MIT license

The root `package.json` SHALL include `"license": "MIT"` in its top-level fields.

#### Scenario: package.json license field

- **WHEN** reading root `package.json`
- **THEN** the `"license"` field is `"MIT"`

### Requirement: Root package.json has correct workspace name

The root `package.json` `"name"` field SHALL be `"ngx-cupertino"` (not the template's `"@org/source"`).

#### Scenario: Correct workspace name

- **WHEN** reading root `package.json`
- **THEN** `"name"` is `"ngx-cupertino"` and `"private"` is `true`

