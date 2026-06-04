## ADDED Requirements

### Requirement: provideCupIcons function exists

The `libs/icons/src/lib/provide-icons.ts` file SHALL export a `provideCupIcons()` function returning `EnvironmentProviders`.

#### Scenario: Function exists

- **WHEN** reading `provide-icons.ts`
- **THEN** it exports `provideCupIcons` function

### Requirement: provideCupIcons registers at least 55 icons

The function SHALL call `provideLucideIcons()` from `@lucide/angular` with at least 55 Lucide icon component references.

#### Scenario: Icon count

- **WHEN** counting arguments to `provideLucideIcons()`
- **THEN** at least 55 icon references are passed

### Requirement: Imports use Lucide PascalCase naming

All icon imports SHALL follow the `Lucide` + PascalCase pattern (`LucideHome`, `LucideSearch`, `LucideTriangleAlert`).

#### Scenario: Import naming

- **WHEN** reading `provide-icons.ts`
- **THEN** icon imports start with `Lucide` prefix (e.g., `LucideHome`, not `Home`)

### Requirement: Common icons are registered

The function SHALL register at minimum: `Home`, `Search`, `Settings`, `Bell`, `Star`, `Heart`, `Bookmark`, `Share`, `Trash2`, `Pencil`, `Plus`, `X`, all 4 `Chevron` directions, `MoreHorizontal`, `RefreshCw`, `Mail`, `UserCircle`.

#### Scenario: Core icons present

- **WHEN** reading `provide-icons.ts`
- **THEN** `provideLucideIcons()` call includes `LucideHome`, `LucideSearch`, `LucideBell`, `LucideHeart`
