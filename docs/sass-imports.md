# Sass Imports

## Standard

- Public consumer-facing Sass should use package imports:
  - `@use "@ngx-cupertino/tokens" as t;`
  - `@use "@ngx-cupertino/core" as cup;`
- Component and package source in `core`, `ui`, and `icons` should also prefer those package imports.
- Internal implementation details inside the Sass packages themselves may still use stable local imports when appropriate.

## Workspace Builder Support

Angular builders and `ng-packagr` are not fully consistent across all workspace surfaces when resolving bare scoped Sass package imports from source files.
This repo supports the package-import standard by publishing real Sass root entrypoints and by including `node_modules` in the relevant Sass include/load paths for:

- `ng-packagr` library builds
- Angular app builds
- Storybook builds

## Package Contract

- `libs/tokens/package.json` publishes a Sass root entrypoint via `"sass": "./_index.scss"`.
- `libs/core/package.json` publishes a Sass root entrypoint via `"sass": "./_index.scss"`.
- These root entrypoints forward to the internal `src` implementation.
- `libs/tokens/_index.scss` forwards to `libs/tokens/src`.
- `libs/core/_index.scss` forwards to `libs/core/src`.

## Practical Rule

- Use package imports in consumer surfaces, docs, examples, external apps, and component/package SCSS in `core`, `ui`, and `icons`.
- Keep local stable imports only for true internal Sass implementation details such as `tokens` internals or sibling partials like `../mixins`.
