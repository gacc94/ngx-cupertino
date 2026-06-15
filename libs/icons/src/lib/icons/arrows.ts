import {
    LucideArrowDown,
    LucideArrowDownLeft,
    LucideArrowDownRight,
    LucideArrowLeft,
    LucideArrowRight,
    LucideArrowUp,
    LucideArrowUpDown,
    LucideArrowUpLeft,
    LucideArrowUpRight,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideChevronUp,
    LucideDownload,
    LucideEllipsis,
    LucideExternalLink,
    LucideFilter,
    LucideMaximize,
    LucideMenu,
    LucideMinimize,
    LucideRefreshCw,
    LucideRotateCw,
    LucideSlidersHorizontal,
    LucideUndo2,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const chevronLeftIcon = { name: "chevron.left", icon: LucideChevronLeft } as const satisfies CupIconDef;
export const chevronRightIcon = { name: "chevron.right", icon: LucideChevronRight } as const satisfies CupIconDef;
export const chevronUpIcon = { name: "chevron.up", icon: LucideChevronUp } as const satisfies CupIconDef;
export const chevronDownIcon = { name: "chevron.down", icon: LucideChevronDown } as const satisfies CupIconDef;
export const arrowRightIcon = { name: "arrow.right", icon: LucideArrowRight } as const satisfies CupIconDef;
export const arrowLeftIcon = { name: "arrow.left", icon: LucideArrowLeft } as const satisfies CupIconDef;
export const arrowUpIcon = { name: "arrow.up", icon: LucideArrowUp } as const satisfies CupIconDef;
export const arrowDownIcon = { name: "arrow.down", icon: LucideArrowDown } as const satisfies CupIconDef;
export const arrowUpRightIcon = { name: "arrow.up.right", icon: LucideArrowUpRight } as const satisfies CupIconDef;
export const arrowUpLeftIcon = { name: "arrow.up.left", icon: LucideArrowUpLeft } as const satisfies CupIconDef;
export const arrowDownRightIcon = {
    name: "arrow.down.right",
    icon: LucideArrowDownRight,
} as const satisfies CupIconDef;
export const arrowDownLeftIcon = { name: "arrow.down.left", icon: LucideArrowDownLeft } as const satisfies CupIconDef;
export const arrowUpArrowDownIcon = {
    name: "arrow.up.arrow.down",
    icon: LucideArrowUpDown,
} as const satisfies CupIconDef;
export const arrowClockwiseIcon = { name: "arrow.clockwise", icon: LucideRefreshCw } as const satisfies CupIconDef;
export const arrowCounterclockwiseIcon = {
    name: "arrow.counterclockwise",
    icon: LucideUndo2,
} as const satisfies CupIconDef;
export const rotateClockwiseIcon = {
    name: "arrow.clockwise.circle",
    icon: LucideRotateCw,
} as const satisfies CupIconDef;
export const maximizeIcon = {
    name: "arrow.up.left.and.arrow.down.right",
    icon: LucideMaximize,
} as const satisfies CupIconDef;
export const minimizeIcon = {
    name: "arrow.down.right.and.arrow.up.left",
    icon: LucideMinimize,
} as const satisfies CupIconDef;
export const downloadIcon = { name: "arrow.down.to.line", icon: LucideDownload } as const satisfies CupIconDef;
export const externalLinkIcon = {
    name: "arrow.up.right.square",
    icon: LucideExternalLink,
} as const satisfies CupIconDef;
export const line3HorizontalIcon = { name: "line.3.horizontal", icon: LucideMenu } as const satisfies CupIconDef;
export const filterIcon = { name: "line.3.horizontal.decrease", icon: LucideFilter } as const satisfies CupIconDef;
export const ellipsisIcon = { name: "ellipsis", icon: LucideEllipsis } as const satisfies CupIconDef;
export const sliderHorizontal3Icon = {
    name: "slider.horizontal.3",
    icon: LucideSlidersHorizontal,
} as const satisfies CupIconDef;

export const ARROW_ICONS = [
    chevronLeftIcon,
    chevronRightIcon,
    chevronUpIcon,
    chevronDownIcon,
    arrowRightIcon,
    arrowLeftIcon,
    arrowUpIcon,
    arrowDownIcon,
    arrowUpRightIcon,
    arrowUpLeftIcon,
    arrowDownRightIcon,
    arrowDownLeftIcon,
    arrowUpArrowDownIcon,
    arrowClockwiseIcon,
    arrowCounterclockwiseIcon,
    rotateClockwiseIcon,
    maximizeIcon,
    minimizeIcon,
    downloadIcon,
    externalLinkIcon,
    line3HorizontalIcon,
    filterIcon,
    ellipsisIcon,
    sliderHorizontal3Icon,
] as const;
