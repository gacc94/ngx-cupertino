# core-utils Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: CupFormControl abstract class implements CVA

The `libs/core/src/lib/utils/base-cva.ts` file SHALL export an abstract `CupFormControl<T = string>` class decorated with `@Directive()` that implements `ControlValueAccessor`. It SHALL expose `value` and `disabled` as signals.

#### Scenario: Class is abstract and decorated

- **WHEN** reading `base-cva.ts`
- **THEN** the class has `@Directive()` decorator with `standalone: true` NOT present
- **THEN** the class is declared `abstract`
- **THEN** it `implements ControlValueAccessor`

### Requirement: CupFormControl implements writeValue

The `writeValue(v: T)` method SHALL update the `value` signal.

#### Scenario: writeValue updates signal

- **WHEN** `writeValue('hello')` is called on a `CupFormControl<string>` instance
- **THEN** `value()` returns `'hello'`

### Requirement: CupFormControl implements registerOnChange

The `registerOnChange(fn)` method SHALL store the callback for later invocation.

#### Scenario: onChange is registered and callable

- **WHEN** `registerOnChange(fn)` is called with a function
- **THEN** calling `onChange('new value')` invokes the registered function with `'new value'`

### Requirement: CupFormControl implements registerOnTouched

The `registerOnTouched(fn)` method SHALL store the callback for later invocation.

#### Scenario: onTouched is registered

- **WHEN** `registerOnTouched(fn)` is called with a function
- **THEN** calling `onTouched()` invokes the registered function

### Requirement: CupFormControl implements setDisabledState

The `setDisabledState(d: boolean)` method SHALL update the `disabled` signal.

#### Scenario: setDisabledState updates signal

- **WHEN** `setDisabledState(true)` is called
- **THEN** `disabled()` returns `true`

### Requirement: generateId function exists

The `libs/core/src/lib/utils/id-generator.ts` file SHALL export a `generateId(prefix?: string)` function that returns unique incrementing IDs.

#### Scenario: Unique IDs with default prefix

- **WHEN** calling `generateId()` twice
- **THEN** it returns `'cup-1'` and `'cup-2'`

#### Scenario: Custom prefix

- **WHEN** calling `generateId('btn')` once
- **THEN** it returns `'btn-3'` (continuing the global counter)

