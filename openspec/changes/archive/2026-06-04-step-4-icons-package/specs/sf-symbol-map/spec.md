## ADDED Requirements

### Requirement: SF_SYMBOL_MAP exists as a Record

The `libs/icons/src/lib/sf-symbol-map.ts` file SHALL export a `SF_SYMBOL_MAP` constant of type `Record<string, string>`.

#### Scenario: Map exists

- **WHEN** reading `sf-symbol-map.ts`
- **THEN** it exports `SF_SYMBOL_MAP` as a `Record<string, string>`

### Requirement: SF_SYMBOL_MAP contains at least 60 entries

The map SHALL contain at least 60 key-value pairs mapping Apple SF Symbols names to Lucide icon names.

#### Scenario: Minimum entries

- **WHEN** counting keys in `SF_SYMBOL_MAP`
- **THEN** the map has at least 60 entries

### Requirement: Fill variants map to same Lucide icon

SF Symbol names ending in `.fill` SHALL map to the same Lucide icon as their non-fill counterparts.

#### Scenario: Fill mapping

- **WHEN** looking up `'heart.fill'`
- **THEN** it returns the same value as `'heart'`

### Requirement: Common navigation icons are mapped

The map SHALL include entries for common navigation SF Symbols: `house`, `gear`, `envelope`, `bell`, `magnifyingglass`, `person.circle`.

#### Scenario: Navigation icons present

- **WHEN** looking up `'house'`, `'gear'`, `'bell'`
- **THEN** all return non-null string values
