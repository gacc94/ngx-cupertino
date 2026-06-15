import {
    LucideAlarmClock,
    LucideCalendar,
    LucideCalendarPlus,
    LucideClock,
    LucideHourglass,
    LucideTimer,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const calendarIcon = { name: "calendar", icon: LucideCalendar } as const satisfies CupIconDef;
export const calendarBadgePlusIcon = {
    name: "calendar.badge.plus",
    icon: LucideCalendarPlus,
} as const satisfies CupIconDef;
export const clockIcon = { name: "clock", icon: LucideClock } as const satisfies CupIconDef;
export const alarmIcon = { name: "alarm", icon: LucideAlarmClock } as const satisfies CupIconDef;
export const timerIcon = { name: "timer", icon: LucideTimer } as const satisfies CupIconDef;
export const hourglassIcon = { name: "hourglass", icon: LucideHourglass } as const satisfies CupIconDef;

export const TIME_ICONS = [
    calendarIcon,
    calendarBadgePlusIcon,
    clockIcon,
    alarmIcon,
    timerIcon,
    hourglassIcon,
] as const;
