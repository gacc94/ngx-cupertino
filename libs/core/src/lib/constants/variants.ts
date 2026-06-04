export const CupButtonVariants = {
    LIQUID_GLASS: "liquid-glass",
    TINTED: "tinted",
    FILLED: "filled",
    PLAIN: "plain",
} as const;

export type CupButtonVariant = (typeof CupButtonVariants)[keyof typeof CupButtonVariants];

export const CupCardVariants = {
    ELEVATED: "elevated",
    OUTLINED: "outlined",
    LIQUID_GLASS: "liquid-glass",
} as const;

export type CupCardVariant = (typeof CupCardVariants)[keyof typeof CupCardVariants];

export type CupProgressType = "linear" | "circular";

export type CupIconPosition = "start" | "end";
