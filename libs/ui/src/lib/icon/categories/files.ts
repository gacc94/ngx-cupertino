import {
    LucideClipboard,
    LucideCopy,
    LucideFile,
    LucideFilePlus,
    LucideFolder,
    LucideFolderPlus,
    LucideList,
    LucideListOrdered,
    LucideScissors,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const docIcon = { name: "doc", icon: LucideFile } as const satisfies CupIconDef;
export const docFillIcon = { name: "doc.fill", icon: LucideFile } as const satisfies CupIconDef;
export const docOnDocIcon = { name: "doc.on.doc", icon: LucideCopy } as const satisfies CupIconDef;
export const docBadgePlusIcon = { name: "doc.badge.plus", icon: LucideFilePlus } as const satisfies CupIconDef;
export const folderIcon = { name: "folder", icon: LucideFolder } as const satisfies CupIconDef;
export const folderFillIcon = { name: "folder.fill", icon: LucideFolder } as const satisfies CupIconDef;
export const folderBadgePlusIcon = { name: "folder.badge.plus", icon: LucideFolderPlus } as const satisfies CupIconDef;
export const clipboardIcon = { name: "clipboard", icon: LucideClipboard } as const satisfies CupIconDef;
export const listBulletIcon = { name: "list.bullet", icon: LucideList } as const satisfies CupIconDef;
export const listNumberIcon = { name: "list.number", icon: LucideListOrdered } as const satisfies CupIconDef;
export const scissorsIcon = { name: "scissors", icon: LucideScissors } as const satisfies CupIconDef;

export const FILE_ICONS = [
    docIcon,
    docFillIcon,
    docOnDocIcon,
    docBadgePlusIcon,
    folderIcon,
    folderFillIcon,
    folderBadgePlusIcon,
    clipboardIcon,
    listBulletIcon,
    listNumberIcon,
    scissorsIcon,
] as const;
