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
    icons --> tokens
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
3. @ngx-cupertino/icons    (depends on tokens + @lucide/angular)
4. @ngx-cupertino/ui       (depends on tokens + core + icons)
```

`core` and `icons` are independent of each other, but both come after `tokens`. `ui` always goes last.

## Monorepo Version Flow

```mermaid
flowchart TD
    RP[Release Please] --> Root[Root package.json\nversion bump]
    Root --> Extra[extra-files config]
    Extra --> Tokens[libs/tokens/package.json]
    Extra --> Core[libs/core/package.json]
    Extra --> Icons[libs/icons/package.json]
    Extra --> UI[libs/ui/package.json]

    Manifest[".release-please-manifest.json\ntracks current version"]

    style RP fill:#fff3cd
    style Manifest fill:#fff3cd
```

Release Please bumps the root `package.json` version, then `extra-files` syncs that version to all 4 lib package.json files. The manifest tracks the current released version for next bump calculation.
