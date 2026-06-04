export const CupTints = {
    BLUE: { light: "#007AFF", dark: "#0A84FF" },
    GREEN: { light: "#34C759", dark: "#30D158" },
    INDIGO: { light: "#5856D6", dark: "#5E5CE6" },
    ORANGE: { light: "#FF9500", dark: "#FF9F0A" },
    PINK: { light: "#FF2D55", dark: "#FF375F" },
    PURPLE: { light: "#AF52DE", dark: "#BF5AF2" },
    RED: { light: "#FF3B30", dark: "#FF453A" },
    TEAL: { light: "#30B0C7", dark: "#40C8E0" },
    YELLOW: { light: "#FFCC00", dark: "#FFD60A" },
    GRAY: { light: "#8E8E93", dark: "#8E8E93" },
    MINT: { light: "#00C7BE", dark: "#63E6E2" },
    CYAN: { light: "#32ADE6", dark: "#64D2FF" },
    BROWN: { light: "#A2845E", dark: "#AC8E68" },
} as const;

export type CupTintName = keyof typeof CupTints;
