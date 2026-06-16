import {
    LucideAtSign,
    LucideInbox,
    LucideLink,
    LucideMessageCircle,
    LucideMessageSquare,
    LucideMic,
    LucideMicOff,
    LucidePaperclip,
    LucidePhone,
    LucideSend,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const phoneIcon = { name: "phone", icon: LucidePhone } as const satisfies CupIconDef;
export const phoneFillIcon = { name: "phone.fill", icon: LucidePhone } as const satisfies CupIconDef;
export const micIcon = { name: "mic", icon: LucideMic } as const satisfies CupIconDef;
export const micFillIcon = { name: "mic.fill", icon: LucideMic } as const satisfies CupIconDef;
export const micSlashIcon = { name: "mic.slash", icon: LucideMicOff } as const satisfies CupIconDef;
export const messageIcon = { name: "message", icon: LucideMessageCircle } as const satisfies CupIconDef;
export const messageFillIcon = { name: "message.fill", icon: LucideMessageCircle } as const satisfies CupIconDef;
export const bubbleLeftIcon = { name: "bubble.left", icon: LucideMessageSquare } as const satisfies CupIconDef;
export const bubbleLeftFillIcon = { name: "bubble.left.fill", icon: LucideMessageSquare } as const satisfies CupIconDef;
export const atIcon = { name: "at", icon: LucideAtSign } as const satisfies CupIconDef;
export const paperplaneIcon = { name: "paperplane", icon: LucideSend } as const satisfies CupIconDef;
export const paperplaneFillIcon = { name: "paperplane.fill", icon: LucideSend } as const satisfies CupIconDef;
export const paperclipIcon = { name: "paperclip", icon: LucidePaperclip } as const satisfies CupIconDef;
export const trayIcon = { name: "tray", icon: LucideInbox } as const satisfies CupIconDef;
export const trayFillIcon = { name: "tray.fill", icon: LucideInbox } as const satisfies CupIconDef;
export const linkIcon = { name: "link", icon: LucideLink } as const satisfies CupIconDef;

export const COMMUNICATION_ICONS = [
    phoneIcon,
    phoneFillIcon,
    micIcon,
    micFillIcon,
    micSlashIcon,
    messageIcon,
    messageFillIcon,
    bubbleLeftIcon,
    bubbleLeftFillIcon,
    atIcon,
    paperplaneIcon,
    paperplaneFillIcon,
    paperclipIcon,
    trayIcon,
    trayFillIcon,
    linkIcon,
] as const;
