import {
    LucideCloud,
    LucideCloudLightning,
    LucideCloudRain,
    LucideCloudSnow,
    LucideFlame,
    LucideMoon,
    LucideSparkles,
    LucideSun,
    LucideSunDim,
    LucideSunrise,
    LucideSunset,
    LucideUmbrella,
    LucideZap,
    LucideZapOff,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const sunMaxIcon = { name: "sun.max", icon: LucideSun } as const satisfies CupIconDef;
export const sunMaxFillIcon = { name: "sun.max.fill", icon: LucideSun } as const satisfies CupIconDef;
export const sunMinIcon = { name: "sun.min", icon: LucideSunDim } as const satisfies CupIconDef;
export const sunMinFillIcon = { name: "sun.min.fill", icon: LucideSunDim } as const satisfies CupIconDef;
export const moonIcon = { name: "moon", icon: LucideMoon } as const satisfies CupIconDef;
export const moonFillIcon = { name: "moon.fill", icon: LucideMoon } as const satisfies CupIconDef;
export const cloudIcon = { name: "cloud", icon: LucideCloud } as const satisfies CupIconDef;
export const cloudFillIcon = { name: "cloud.fill", icon: LucideCloud } as const satisfies CupIconDef;
export const cloudRainIcon = { name: "cloud.rain", icon: LucideCloudRain } as const satisfies CupIconDef;
export const cloudRainFillIcon = { name: "cloud.rain.fill", icon: LucideCloudRain } as const satisfies CupIconDef;
export const cloudSnowIcon = { name: "cloud.snow", icon: LucideCloudSnow } as const satisfies CupIconDef;
export const cloudSnowFillIcon = { name: "cloud.snow.fill", icon: LucideCloudSnow } as const satisfies CupIconDef;
export const cloudBoltIcon = { name: "cloud.bolt", icon: LucideCloudLightning } as const satisfies CupIconDef;
export const cloudBoltFillIcon = { name: "cloud.bolt.fill", icon: LucideCloudLightning } as const satisfies CupIconDef;
export const umbrellaIcon = { name: "umbrella", icon: LucideUmbrella } as const satisfies CupIconDef;
export const umbrellaFillIcon = { name: "umbrella.fill", icon: LucideUmbrella } as const satisfies CupIconDef;
export const sunriseIcon = { name: "sunrise", icon: LucideSunrise } as const satisfies CupIconDef;
export const sunsetIcon = { name: "sunset", icon: LucideSunset } as const satisfies CupIconDef;
export const sparklesIcon = { name: "sparkles", icon: LucideSparkles } as const satisfies CupIconDef;
export const flameIcon = { name: "flame", icon: LucideFlame } as const satisfies CupIconDef;
export const flameFillIcon = { name: "flame.fill", icon: LucideFlame } as const satisfies CupIconDef;
export const boltIcon = { name: "bolt", icon: LucideZap } as const satisfies CupIconDef;
export const boltFillIcon = { name: "bolt.fill", icon: LucideZap } as const satisfies CupIconDef;
export const boltSlashIcon = { name: "bolt.slash", icon: LucideZapOff } as const satisfies CupIconDef;

export const WEATHER_ICONS = [
    sunMaxIcon,
    sunMaxFillIcon,
    sunMinIcon,
    sunMinFillIcon,
    moonIcon,
    moonFillIcon,
    cloudIcon,
    cloudFillIcon,
    cloudRainIcon,
    cloudRainFillIcon,
    cloudSnowIcon,
    cloudSnowFillIcon,
    cloudBoltIcon,
    cloudBoltFillIcon,
    umbrellaIcon,
    umbrellaFillIcon,
    sunriseIcon,
    sunsetIcon,
    sparklesIcon,
    flameIcon,
    flameFillIcon,
    boltIcon,
    boltFillIcon,
    boltSlashIcon,
] as const;
