import {
    LucideBookmark,
    LucideCircleMinus,
    LucideCirclePlus,
    LucideCircleX,
    LucideHeart,
    LucideHeartCrack,
    LucideMinus,
    LucidePencil,
    LucidePlus,
    LucideShare,
    LucideSquarePen,
    LucideStar,
    LucideTrash2,
    LucideX,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const starIcon = { name: "star", icon: LucideStar } as const satisfies CupIconDef;
export const starFillIcon = { name: "star.fill", icon: LucideStar } as const satisfies CupIconDef;
export const heartIcon = { name: "heart", icon: LucideHeart } as const satisfies CupIconDef;
export const heartFillIcon = { name: "heart.fill", icon: LucideHeart } as const satisfies CupIconDef;
export const heartCrackIcon = { name: "heart.crack", icon: LucideHeartCrack } as const satisfies CupIconDef;
export const bookmarkIcon = { name: "bookmark", icon: LucideBookmark } as const satisfies CupIconDef;
export const bookmarkFillIcon = { name: "bookmark.fill", icon: LucideBookmark } as const satisfies CupIconDef;
export const squareAndArrowUpIcon = { name: "square.and.arrow.up", icon: LucideShare } as const satisfies CupIconDef;
export const squareAndArrowUpFillIcon = {
    name: "square.and.arrow.up.fill",
    icon: LucideShare,
} as const satisfies CupIconDef;
export const trashIcon = { name: "trash", icon: LucideTrash2 } as const satisfies CupIconDef;
export const trashFillIcon = { name: "trash.fill", icon: LucideTrash2 } as const satisfies CupIconDef;
export const pencilIcon = { name: "pencil", icon: LucidePencil } as const satisfies CupIconDef;
export const squareAndPencilIcon = { name: "square.and.pencil", icon: LucideSquarePen } as const satisfies CupIconDef;
export const plusIcon = { name: "plus", icon: LucidePlus } as const satisfies CupIconDef;
export const minusIcon = { name: "minus", icon: LucideMinus } as const satisfies CupIconDef;
export const xmarkIcon = { name: "xmark", icon: LucideX } as const satisfies CupIconDef;
export const plusCircleIcon = { name: "plus.circle", icon: LucideCirclePlus } as const satisfies CupIconDef;
export const plusCircleFillIcon = { name: "plus.circle.fill", icon: LucideCirclePlus } as const satisfies CupIconDef;
export const minusCircleIcon = { name: "minus.circle", icon: LucideCircleMinus } as const satisfies CupIconDef;
export const minusCircleFillIcon = { name: "minus.circle.fill", icon: LucideCircleMinus } as const satisfies CupIconDef;
export const xmarkCircleIcon = { name: "xmark.circle", icon: LucideCircleX } as const satisfies CupIconDef;
export const xmarkCircleFillIcon = { name: "xmark.circle.fill", icon: LucideCircleX } as const satisfies CupIconDef;

export const ACTION_ICONS = [
    starIcon,
    starFillIcon,
    heartIcon,
    heartFillIcon,
    heartCrackIcon,
    bookmarkIcon,
    bookmarkFillIcon,
    squareAndArrowUpIcon,
    squareAndArrowUpFillIcon,
    trashIcon,
    trashFillIcon,
    pencilIcon,
    squareAndPencilIcon,
    plusIcon,
    minusIcon,
    xmarkIcon,
    plusCircleIcon,
    plusCircleFillIcon,
    minusCircleIcon,
    minusCircleFillIcon,
    xmarkCircleIcon,
    xmarkCircleFillIcon,
] as const;
