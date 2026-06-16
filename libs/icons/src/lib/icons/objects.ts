import {
    LucideCrown,
    LucideFlag,
    LucideHammer,
    LucideKey,
    LucideLightbulb,
    LucideMedal,
    LucidePaintbrush,
    LucidePin,
    LucideTarget,
    LucideTrophy,
    LucideWrench,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const lightbulbIcon = { name: "lightbulb", icon: LucideLightbulb } as const satisfies CupIconDef;
export const lightbulbFillIcon = { name: "lightbulb.fill", icon: LucideLightbulb } as const satisfies CupIconDef;
export const keyIcon = { name: "key", icon: LucideKey } as const satisfies CupIconDef;
export const keyFillIcon = { name: "key.fill", icon: LucideKey } as const satisfies CupIconDef;
export const flagIcon = { name: "flag", icon: LucideFlag } as const satisfies CupIconDef;
export const flagFillIcon = { name: "flag.fill", icon: LucideFlag } as const satisfies CupIconDef;
export const pinIcon = { name: "pin", icon: LucidePin } as const satisfies CupIconDef;
export const pinFillIcon = { name: "pin.fill", icon: LucidePin } as const satisfies CupIconDef;
export const paintbrushIcon = { name: "paintbrush", icon: LucidePaintbrush } as const satisfies CupIconDef;
export const wrenchIcon = { name: "wrench", icon: LucideWrench } as const satisfies CupIconDef;
export const hammerIcon = { name: "hammer", icon: LucideHammer } as const satisfies CupIconDef;
export const targetIcon = { name: "target", icon: LucideTarget } as const satisfies CupIconDef;
export const trophyIcon = { name: "trophy", icon: LucideTrophy } as const satisfies CupIconDef;
export const trophyFillIcon = { name: "trophy.fill", icon: LucideTrophy } as const satisfies CupIconDef;
export const medalIcon = { name: "medal", icon: LucideMedal } as const satisfies CupIconDef;
export const crownIcon = { name: "crown", icon: LucideCrown } as const satisfies CupIconDef;

export const OBJECT_ICONS = [
    lightbulbIcon,
    lightbulbFillIcon,
    keyIcon,
    keyFillIcon,
    flagIcon,
    flagFillIcon,
    pinIcon,
    pinFillIcon,
    paintbrushIcon,
    wrenchIcon,
    hammerIcon,
    targetIcon,
    trophyIcon,
    trophyFillIcon,
    medalIcon,
    crownIcon,
] as const;
