## ADDED Requirements

### Requirement: RippleDirective uses DOCUMENT for element creation

The `RippleDirective` SHALL use `inject(DOCUMENT).createElement("span")` instead of `inject(Renderer2).createElement("span")` to create the ripple element.

#### Scenario: Element created via DOCUMENT

- **WHEN** reading `ripple.directive.ts`
- **THEN** `Renderer2` is NOT imported or injected
- **THEN** `DOCUMENT` from `@angular/common` is injected and used for `createElement`

### Requirement: Ripple animation cleanup uses host metadata

The `ripple.addEventListener("animationend", ...)` call SHALL be replaced with a `host:` metadata binding `'(animationend)': 'onAnimationEnd($event)'` where feasible, or use Angular's `@HostListener` in `host:` metadata.

#### Scenario: Animation cleanup is reactive

- **WHEN** the ripple animation ends
- **THEN** the ripple element is removed via a method bound in `host:` metadata rather than an inline `addEventListener` callback
