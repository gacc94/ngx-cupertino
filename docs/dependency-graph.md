# Dependency Graph

How the 4 packages depend on each other and external dependencies.

## Internal Dependencies

```mermaid
flowchart TD
    tokens["@ngx-cupertino/tokens\n(SCSS only, no runtime deps)"]
    core["@ngx-cupertino/core\n(providers, services, base classes)"]
    icons["@ngx-cupertino/icons\n(SF Symbol to Lucide mapping)"]
    ui["@ngx-cupertino/ui\n(Button, Toggle, TextField,\nSlider, Stepper, Progress)"]
    lucide["@lucide/angular"]
    angular["@angular/core\n@angular/cdk\n@angular/forms"]

    core --> tokens
    icons --> lucide
    icons -.-> angular
    core -.-> angular
    ui --> tokens
    ui --> core
    ui --> icons
    ui -.-> angular
    ui -.-> lucide

    style tokens fill:#e8f4fd
    style core fill:#fff3cd
    style icons fill:#d4edda
    style ui fill:#f0e6ff
```

Solid lines = `peerDependencies` on `@ngx-cupertino/*` packages.
Dotted lines = `peerDependencies` on external packages.

## Publish Order

Derived from the dependency graph — each package depends on all previously published packages:

```
1. @ngx-cupertino/tokens   (no @ngx-cupertino deps)
2. @ngx-cupertino/core     (depends on tokens)
3. @ngx-cupertino/icons    (no @ngx-cupertino deps, only @lucide/angular)
4. @ngx-cupertino/ui       (depends on tokens + core + icons)
```

`core` and `icons` are independent of each other and can be published in any order. `ui` always goes last.

## Monorepo Structure

```mermaid
flowchart TD
    root["package.json\n(root version)"]
    config["release-please-config.json\nextra-files: libs/*/package.json"]
    manifest[".release-please-manifest.json\nversion tracking"]

    tokens_src["libs/tokens/package.json"]
    core_src["libs/core/package.json"]
    icons_src["libs/icons/package.json"]
    ui_src["libs/ui/package.json"]
    playground["apps/playground\n(dev app)"]

    root -->|"Release Please bumps version"| root
    config -->|"extra-files syncs version to"| tokens_src
    config -->|"extra-files syncs version to"| core_src
    config -->|"extra-files syncs version to"| icons_src
    config -->|"extra-files syncs version to"| ui_src
    manifest -->|"tracks current version"| root

    style root fill:#e8f4fd
    style config fill:#fff3cd
    style manifest fill:#fff3cd
```

Release Please bumps the root `package.json` version. The `extra-files` config syncs that version to all 4 `libs/*/package.json`. The `.release-please-manifest.json` tracks the current released version.
