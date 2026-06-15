export const CupButtonVariants = {
    LIQUID_GLASS: "liquid-glass",
    TINTED: "tinted",
    FILLED: "filled",
    PLAIN: "plain",
    GRAY: "gray",
} as const;

export type CupButtonVariant = (typeof CupButtonVariants)[keyof typeof CupButtonVariants];

/**
 * Button border shape, mirroring Apple's `buttonBorderShape`.
 *
 * - `auto` — platform default: capsule on touch, rounded rectangle on desktop; icon-only resolves to `circle`.
 * - `capsule` — fully rounded pill.
 * - `rounded` — rounded rectangle.
 * - `circle` — circular (intended for icon-only buttons).
 */
export type CupButtonShape = "auto" | "capsule" | "rounded" | "circle";

export const CupCardVariants = {
    ELEVATED: "elevated",
    OUTLINED: "outlined",
    LIQUID_GLASS: "liquid-glass",
} as const;

export type CupCardVariant = (typeof CupCardVariants)[keyof typeof CupCardVariants];

export type CupProgressType = "linear" | "circular" | "spinner";

export type CupIconPosition = "start" | "end";
