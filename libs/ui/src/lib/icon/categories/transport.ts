import { LucideBike, LucideBus, LucideCar, LucidePlane, LucideShip, LucideTrainFront } from "@lucide/angular";
import type { CupIconDef } from "./types";

export const carIcon = { name: "car", icon: LucideCar } as const satisfies CupIconDef;
export const carFillIcon = { name: "car.fill", icon: LucideCar } as const satisfies CupIconDef;
export const airplaneIcon = { name: "airplane", icon: LucidePlane } as const satisfies CupIconDef;
export const busIcon = { name: "bus", icon: LucideBus } as const satisfies CupIconDef;
export const busFillIcon = { name: "bus.fill", icon: LucideBus } as const satisfies CupIconDef;
export const bicycleIcon = { name: "bicycle", icon: LucideBike } as const satisfies CupIconDef;
export const tramIcon = { name: "tram", icon: LucideTrainFront } as const satisfies CupIconDef;
export const tramFillIcon = { name: "tram.fill", icon: LucideTrainFront } as const satisfies CupIconDef;
export const ferryIcon = { name: "ferry", icon: LucideShip } as const satisfies CupIconDef;
export const ferryFillIcon = { name: "ferry.fill", icon: LucideShip } as const satisfies CupIconDef;

export const TRANSPORT_ICONS = [
    carIcon,
    carFillIcon,
    airplaneIcon,
    busIcon,
    busFillIcon,
    bicycleIcon,
    tramIcon,
    tramFillIcon,
    ferryIcon,
    ferryFillIcon,
] as const;
