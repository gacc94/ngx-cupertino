import {
    LucideCheck,
    LucideCircleCheckBig,
    LucideCircleQuestionMark,
    LucideEye,
    LucideEyeOff,
    LucideInfo,
    LucideLock,
    LucideLockOpen,
    LucideShield,
    LucideShieldCheck,
    LucideTriangleAlert,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const checkmarkIcon = { name: "checkmark", icon: LucideCheck } as const satisfies CupIconDef;
export const checkmarkCircleIcon = {
    name: "checkmark.circle",
    icon: LucideCircleCheckBig,
} as const satisfies CupIconDef;
export const checkmarkCircleFillIcon = {
    name: "checkmark.circle.fill",
    icon: LucideCircleCheckBig,
} as const satisfies CupIconDef;
export const checkmarkShieldIcon = { name: "checkmark.shield", icon: LucideShieldCheck } as const satisfies CupIconDef;
export const exclamationmarkTriangleIcon = {
    name: "exclamationmark.triangle",
    icon: LucideTriangleAlert,
} as const satisfies CupIconDef;
export const exclamationmarkTriangleFillIcon = {
    name: "exclamationmark.triangle.fill",
    icon: LucideTriangleAlert,
} as const satisfies CupIconDef;
export const infoCircleIcon = { name: "info.circle", icon: LucideInfo } as const satisfies CupIconDef;
export const infoCircleFillIcon = { name: "info.circle.fill", icon: LucideInfo } as const satisfies CupIconDef;
export const questionmarkCircleIcon = {
    name: "questionmark.circle",
    icon: LucideCircleQuestionMark,
} as const satisfies CupIconDef;
export const questionmarkCircleFillIcon = {
    name: "questionmark.circle.fill",
    icon: LucideCircleQuestionMark,
} as const satisfies CupIconDef;
export const eyeIcon = { name: "eye", icon: LucideEye } as const satisfies CupIconDef;
export const eyeFillIcon = { name: "eye.fill", icon: LucideEye } as const satisfies CupIconDef;
export const eyeSlashIcon = { name: "eye.slash", icon: LucideEyeOff } as const satisfies CupIconDef;
export const lockIcon = { name: "lock", icon: LucideLock } as const satisfies CupIconDef;
export const lockFillIcon = { name: "lock.fill", icon: LucideLock } as const satisfies CupIconDef;
export const lockOpenIcon = { name: "lock.open", icon: LucideLockOpen } as const satisfies CupIconDef;
export const shieldIcon = { name: "shield", icon: LucideShield } as const satisfies CupIconDef;
export const shieldFillIcon = { name: "shield.fill", icon: LucideShield } as const satisfies CupIconDef;

export const STATUS_ICONS = [
    checkmarkIcon,
    checkmarkCircleIcon,
    checkmarkCircleFillIcon,
    checkmarkShieldIcon,
    exclamationmarkTriangleIcon,
    exclamationmarkTriangleFillIcon,
    infoCircleIcon,
    infoCircleFillIcon,
    questionmarkCircleIcon,
    questionmarkCircleFillIcon,
    eyeIcon,
    eyeFillIcon,
    eyeSlashIcon,
    lockIcon,
    lockFillIcon,
    lockOpenIcon,
    shieldIcon,
    shieldFillIcon,
] as const;
