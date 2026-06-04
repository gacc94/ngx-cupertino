export const CupSizes = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
} as const;

export type CupSize = (typeof CupSizes)[keyof typeof CupSizes];
