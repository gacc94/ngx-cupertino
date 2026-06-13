/**
 * Public semantic token names exported by `@ngx-cupertino/core`.
 *
 * This union intentionally covers only semantic foreground, support,
 * background, and separator families. It excludes palette, tint, glass,
 * material, and platform-specific tokens, which follow different review rules.
 */
type CupSemanticForegroundTokenName =
    | "label"
    | "label-secondary"
    | "label-tertiary"
    | "label-quaternary"
    | "vibrant-label"
    | "vibrant-label-secondary"
    | "vibrant-label-tertiary"
    | "vibrant-label-quaternary"
    | "link"
    | "placeholder"
    | "text-dark"
    | "text-light";

type CupSemanticSupportingTokenName =
    | "fill"
    | "fill-secondary"
    | "fill-tertiary"
    | "fill-quaternary"
    | "vibrant-fill"
    | "vibrant-fill-secondary"
    | "vibrant-fill-tertiary"
    | "vibrant-fill-quaternary";

type CupSemanticBackgroundTokenName =
    | "bg"
    | "bg-secondary"
    | "bg-tertiary"
    | "bg-grouped"
    | "bg-grouped-secondary"
    | "bg-grouped-tertiary";

type CupSemanticSeparatorTokenName = "separator" | "separator-opaque";

export type CupSemanticTokenName =
    | CupSemanticForegroundTokenName
    | CupSemanticSupportingTokenName
    | CupSemanticBackgroundTokenName
    | CupSemanticSeparatorTokenName;
