## ADDED Requirements

### Requirement: BreakpointService uses toSignal instead of subscribe

The `BreakpointService` SHALL use `toSignal()` from `@angular/core/rxjs-interop` to convert the `BreakpointObserver.observe()` observable to a signal, instead of manually calling `.subscribe()`.

#### Scenario: No manual subscribe call

- **WHEN** reading `breakpoint.service.ts`
- **THEN** there is no `.subscribe()` call on the `BreakpointObserver.observe()` result
- **THEN** `toSignal()` is used to convert the observable to a signal

#### Scenario: Breakpoints are derived from signal

- **WHEN** the viewport changes from mobile to desktop
- **THEN** `isMobile()`, `isTablet()`, and `isDesktop()` signals update reactively without a manual subscription

### Requirement: No subscription leak

The service SHALL NOT have any Observable subscriptions that persist beyond the service's lifetime.

#### Scenario: Service can be garbage collected

- **WHEN** `BreakpointService` is destroyed (in a non-root context)
- **THEN** no active subscriptions remain (toSignal handles cleanup automatically)
