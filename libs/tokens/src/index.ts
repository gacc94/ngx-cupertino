export const TOKENS_VERSION = "0.0.1";

/**
 * Abbreviated size token shared across the design system (`"sm" | "md" | "lg"`).
 *
 * Lives in `tokens` because component sizing is a design-system contract, not runtime state.
 * Consumed by `@ngx-cupertino/core` (re-exported as `CupComponentSize`) and `@ngx-cupertino/icons`
 * (as `CupIconSize`), keeping a single source of truth without coupling `icons` to `core`.
 */
export type CupComponentSize = "sm" | "md" | "lg";
