import {
    LucideCircleUser,
    LucideFrown,
    LucideHand,
    LucideSmile,
    LucideThumbsDown,
    LucideThumbsUp,
    LucideUser,
    LucideUserPlus,
    LucideUsers,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const personIcon = { name: "person", icon: LucideUser } as const satisfies CupIconDef;
export const personFillIcon = { name: "person.fill", icon: LucideUser } as const satisfies CupIconDef;
export const personBadgePlusIcon = { name: "person.badge.plus", icon: LucideUserPlus } as const satisfies CupIconDef;
export const personCircleIcon = { name: "person.circle", icon: LucideCircleUser } as const satisfies CupIconDef;
export const personCircleFillIcon = {
    name: "person.circle.fill",
    icon: LucideCircleUser,
} as const satisfies CupIconDef;
export const person2Icon = { name: "person.2", icon: LucideUsers } as const satisfies CupIconDef;
export const person2FillIcon = { name: "person.2.fill", icon: LucideUsers } as const satisfies CupIconDef;
export const handThumbsupIcon = { name: "hand.thumbsup", icon: LucideThumbsUp } as const satisfies CupIconDef;
export const handThumbsupFillIcon = {
    name: "hand.thumbsup.fill",
    icon: LucideThumbsUp,
} as const satisfies CupIconDef;
export const handThumbsdownIcon = { name: "hand.thumbsdown", icon: LucideThumbsDown } as const satisfies CupIconDef;
export const handThumbsdownFillIcon = {
    name: "hand.thumbsdown.fill",
    icon: LucideThumbsDown,
} as const satisfies CupIconDef;
export const handRaisedIcon = { name: "hand.raised", icon: LucideHand } as const satisfies CupIconDef;
export const handRaisedFillIcon = { name: "hand.raised.fill", icon: LucideHand } as const satisfies CupIconDef;
export const faceSmilingIcon = { name: "face.smiling", icon: LucideSmile } as const satisfies CupIconDef;
export const faceSmilingFillIcon = { name: "face.smiling.fill", icon: LucideSmile } as const satisfies CupIconDef;
export const faceFrowningIcon = { name: "face.frowning", icon: LucideFrown } as const satisfies CupIconDef;

export const PEOPLE_ICONS = [
    personIcon,
    personFillIcon,
    personBadgePlusIcon,
    personCircleIcon,
    personCircleFillIcon,
    person2Icon,
    person2FillIcon,
    handThumbsupIcon,
    handThumbsupFillIcon,
    handThumbsdownIcon,
    handThumbsdownFillIcon,
    handRaisedIcon,
    handRaisedFillIcon,
    faceSmilingIcon,
    faceSmilingFillIcon,
    faceFrowningIcon,
] as const;
