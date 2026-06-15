import {
    LucideBattery,
    LucideBatteryCharging,
    LucideBatteryFull,
    LucideBluetooth,
    LucideCompass,
    LucideCpu,
    LucideGlobe,
    LucideKeyboard,
    LucideLaptop,
    LucideMonitor,
    LucideNavigation,
    LucideServer,
    LucideSmartphone,
    LucideTablet,
    LucideTerminal,
    LucideWifi,
    LucideWifiOff,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const wifiIcon = { name: "wifi", icon: LucideWifi } as const satisfies CupIconDef;
export const wifiSlashIcon = { name: "wifi.slash", icon: LucideWifiOff } as const satisfies CupIconDef;
export const bluetoothIcon = { name: "bluetooth", icon: LucideBluetooth } as const satisfies CupIconDef;
export const battery100Icon = { name: "battery.100", icon: LucideBatteryFull } as const satisfies CupIconDef;
export const batteryIcon = { name: "battery.0", icon: LucideBattery } as const satisfies CupIconDef;
export const batteryChargingIcon = {
    name: "battery.100.bolt",
    icon: LucideBatteryCharging,
} as const satisfies CupIconDef;
export const globeIcon = { name: "globe", icon: LucideGlobe } as const satisfies CupIconDef;
export const navigationIcon = { name: "location.north", icon: LucideNavigation } as const satisfies CupIconDef;
export const compassIcon = { name: "safari", icon: LucideCompass } as const satisfies CupIconDef;
export const cpuIcon = { name: "cpu", icon: LucideCpu } as const satisfies CupIconDef;
export const serverIcon = { name: "server.rack", icon: LucideServer } as const satisfies CupIconDef;
export const terminalIcon = { name: "terminal", icon: LucideTerminal } as const satisfies CupIconDef;
export const keyboardIcon = { name: "keyboard", icon: LucideKeyboard } as const satisfies CupIconDef;
export const keyboardFillIcon = { name: "keyboard.fill", icon: LucideKeyboard } as const satisfies CupIconDef;
export const desktopcomputerIcon = { name: "desktopcomputer", icon: LucideMonitor } as const satisfies CupIconDef;
export const laptopcomputerIcon = { name: "laptopcomputer", icon: LucideLaptop } as const satisfies CupIconDef;
export const iphoneIcon = { name: "iphone", icon: LucideSmartphone } as const satisfies CupIconDef;
export const ipadIcon = { name: "ipad", icon: LucideTablet } as const satisfies CupIconDef;

export const DEVICE_ICONS = [
    wifiIcon,
    wifiSlashIcon,
    bluetoothIcon,
    battery100Icon,
    batteryIcon,
    batteryChargingIcon,
    globeIcon,
    navigationIcon,
    compassIcon,
    cpuIcon,
    serverIcon,
    terminalIcon,
    keyboardIcon,
    keyboardFillIcon,
    desktopcomputerIcon,
    laptopcomputerIcon,
    iphoneIcon,
    ipadIcon,
] as const;
