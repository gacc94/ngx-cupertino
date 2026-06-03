## 1. Create LICENSE File

- [ ] 1.1 Create `LICENSE` file at workspace root with full MIT License text (from opensource.org/licenses/MIT)
- [ ] 1.2 Ensure copyright line: `Copyright (c) 2026-present ngx-cupertino`
- [ ] 1.3 Verify `package.json` has `"license": "MIT"` (already present)

## 2. Update Root package.json

- [ ] 2.1 Change `"name"` from `"@org/source"` to `"ngx-cupertino"`
- [ ] 2.2 Verify `"private": true` is preserved (workspace root is always private)
- [ ] 2.3 Verify `"license": "MIT"` is preserved

## 3. Write README.md — Header & Badges

- [ ] 3.1 Write project heading: `# @ngx-cupertino/ui` with one-liner: "Angular component library implementing Apple Design System for web"
- [ ] 3.2 Add badges row: Angular (21), TypeScript (5.9), Nx (22.7), Bun, Vitest (4.x), Biome (2.4), MIT License — all using img.shields.io

## 4. Write README.md — Features & Installation

- [ ] 4.1 Write Features section: Apple Design System, 37 standalone components, Signal-based API (input/model/output), Angular host binding styling pattern, 4 publishable packages, Vitest testing
- [ ] 4.2 Write Installation section: `bun add @ngx-cupertino/ui` + peer dependencies note (Angular ≥ 19, TypeScript ≥ 5.5)
- [ ] 4.3 Write Quick Start section with 3 code blocks: `app.config.ts` (provideCupertino), `styles.scss` (tokens import), component template example

## 5. Write README.md — Component Catalog

- [ ] 5.1 Write Components section header with total count (37)
- [ ] 5.2 Create Phase 1 table: Foundations (7 components — Button, Toggle, Text Field, Icon, Slider, Stepper, Progress) with selectors
- [ ] 5.3 Create Phase 2 table: Content (8 — Badge, Tab Bar, Segmented Control, List, Skeleton, Divider, Empty State, Card) with selectors
- [ ] 5.4 Create Phase 3 table: Structure (12 — Sidebar, Toolbar, Alert, Dialog, Sheet, Notification, Menu, Tooltip, Accordion, Drawer, Nav Bar, Layout) with selectors
- [ ] 5.5 Create Phase 4 table: Extended (7 — Action Sheet, Context Menu, Popover, Picker, Pop-up Button, Avatar, Carousel) with selectors
- [ ] 5.6 Create Soon table: Future (3 — Tabs, Breadcrumb, Chip) with selectors

## 6. Write README.md — Architecture & Conventions

- [ ] 6.1 Write Package Architecture section: ASCII diagram showing `tokens → core → icons/ui` dependency flow with descriptions of each package
- [ ] 6.2 Write Styling Conventions section: Document Angular-native pattern (`host:` bindings for state, `cup-` prefixed simple classes, variant classes on host, ViewEncapsulation.Emulated, CSS custom properties, no BEM)
- [ ] 6.3 Include styling code example: TypeScript `host:` block + SCSS `:host()` + `.cup-label` + `.liquid-glass` mixin usage
- [ ] 6.4 Write Commit Conventions section: 10 emoji types (feat ✨, fix 🐛, refactor 📦, test 🧪, docs 📝, perf 🚀, ci 🔧, chore 🚧, style 💄, build 🏗️) + 8 scopes (tokens, core, icons, ui, playground, readme, ci, repo)

## 7. Write README.md — Development & Footer

- [ ] 7.1 Write Development section with commands: `bun nx serve playground`, `bun nx test ui`, `bun nx run-many -t build`, `bun biome check --write .`
- [ ] 7.2 Write Project Structure section: tree showing `apps/playground/`, `libs/tokens/`, `libs/core/`, `libs/ui/`, `libs/icons/`
- [ ] 7.3 Add footer with links: GitHub repository, Nx workspace docs, License reference

## 8. Final Verification

- [ ] 8.1 Verify `LICENSE` file exists and contains valid MIT text
- [ ] 8.2 Verify `package.json` `name` is `"ngx-cupertino"` and `license` is `"MIT"`
- [ ] 8.3 Verify `README.md` contains no template artifacts (no "shop", "Docker", "Playwright", "ESLint" references)
- [ ] 8.4 Verify `README.md` contains all 8 required sections (badges, features, installation, quick start, components, architecture, conventions, development)
- [ ] 8.5 Run `bun biome check --write README.md` to ensure formatting
- [ ] 8.6 Commit: `git add . && git commit -m "docs: 📝 add README and MIT license"`
