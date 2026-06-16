import {
    LucideBell,
    LucideBellOff,
    LucideBellRing,
    LucideHouse,
    LucideLayoutGrid,
    LucideMail,
    LucideMap,
    LucideMapPin,
    LucidePanelLeft,
    LucideSearch,
    LucideSettings,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const houseIcon = { name: "house", icon: LucideHouse } as const satisfies CupIconDef;
export const houseFillIcon = { name: "house.fill", icon: LucideHouse } as const satisfies CupIconDef;
export const envelopeIcon = { name: "envelope", icon: LucideMail } as const satisfies CupIconDef;
export const envelopeFillIcon = { name: "envelope.fill", icon: LucideMail } as const satisfies CupIconDef;
export const gearIcon = { name: "gear", icon: LucideSettings } as const satisfies CupIconDef;
export const gearshapeIcon = { name: "gearshape", icon: LucideSettings } as const satisfies CupIconDef;
export const gearshapeFillIcon = { name: "gearshape.fill", icon: LucideSettings } as const satisfies CupIconDef;
export const magnifyingglassIcon = { name: "magnifyingglass", icon: LucideSearch } as const satisfies CupIconDef;
export const bellIcon = { name: "bell", icon: LucideBell } as const satisfies CupIconDef;
export const bellFillIcon = { name: "bell.fill", icon: LucideBell } as const satisfies CupIconDef;
export const bellSlashIcon = { name: "bell.slash", icon: LucideBellOff } as const satisfies CupIconDef;
export const bellBadgeIcon = { name: "bell.badge", icon: LucideBellRing } as const satisfies CupIconDef;
export const sidebarLeftIcon = { name: "sidebar.left", icon: LucidePanelLeft } as const satisfies CupIconDef;
export const squareGrid2x2Icon = { name: "square.grid.2x2", icon: LucideLayoutGrid } as const satisfies CupIconDef;
export const mapIcon = { name: "map", icon: LucideMap } as const satisfies CupIconDef;
export const mapFillIcon = { name: "map.fill", icon: LucideMap } as const satisfies CupIconDef;
export const locationIcon = { name: "location", icon: LucideMapPin } as const satisfies CupIconDef;
export const locationFillIcon = { name: "location.fill", icon: LucideMapPin } as const satisfies CupIconDef;

export const NAVIGATION_ICONS = [
    houseIcon,
    houseFillIcon,
    envelopeIcon,
    envelopeFillIcon,
    gearIcon,
    gearshapeIcon,
    gearshapeFillIcon,
    magnifyingglassIcon,
    bellIcon,
    bellFillIcon,
    bellSlashIcon,
    bellBadgeIcon,
    sidebarLeftIcon,
    squareGrid2x2Icon,
    mapIcon,

    mapFillIcon,
    locationIcon,
    locationFillIcon,
] as const;
