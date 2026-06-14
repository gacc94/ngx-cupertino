/**
 * @deprecated Use {@link CupComponentSize} (`"sm" | "md" | "lg"`) — the abbreviated form used
 * by all design-system components. `CupSizes` and `CupSize` are retained only for backwards
 * compatibility and will be removed in the next major version.
 */
export const CupSizes = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
} as const;

/**
 * @deprecated Use {@link CupComponentSize} instead.
 */
export type CupSize = (typeof CupSizes)[keyof typeof CupSizes];

/** Abbreviated size token used by all design-system components. */
export type CupComponentSize = "sm" | "md" | "lg";
