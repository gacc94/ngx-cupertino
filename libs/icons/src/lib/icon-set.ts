// Built-in icon set, split by category under `./icons/*`. Each category file owns its icon defs
// (standalone named exports, tree-shakeable) plus a group array. This barrel re-exports every icon
// and assembles `ALL_ICONS` from the group arrays — add an icon in one place, its category file.

export * from "./icons/actions";
export * from "./icons/arrows";
export * from "./icons/commerce";
export * from "./icons/communication";
export * from "./icons/devices";
export * from "./icons/files";
export * from "./icons/media";
export * from "./icons/navigation";
export * from "./icons/objects";
export * from "./icons/people";
export * from "./icons/status";
export * from "./icons/time";
export * from "./icons/transport";
export type { CupIconDef } from "./icons/types";
export * from "./icons/weather";

import { ACTION_ICONS } from "./icons/actions";
import { ARROW_ICONS } from "./icons/arrows";
import { COMMERCE_ICONS } from "./icons/commerce";
import { COMMUNICATION_ICONS } from "./icons/communication";
import { DEVICE_ICONS } from "./icons/devices";
import { FILE_ICONS } from "./icons/files";
import { MEDIA_ICONS } from "./icons/media";
import { NAVIGATION_ICONS } from "./icons/navigation";
import { OBJECT_ICONS } from "./icons/objects";
import { PEOPLE_ICONS } from "./icons/people";
import { STATUS_ICONS } from "./icons/status";
import { TIME_ICONS } from "./icons/time";
import { TRANSPORT_ICONS } from "./icons/transport";
import { WEATHER_ICONS } from "./icons/weather";

/**
 * Every built-in icon. **Only import this in tooling/galleries (Storybook), never in app code** —
 * it references every icon and would defeat tree-shaking. App code imports individual icons.
 */
export const ALL_ICONS = [
    ...NAVIGATION_ICONS,
    ...ARROW_ICONS,
    ...ACTION_ICONS,
    ...STATUS_ICONS,
    ...WEATHER_ICONS,
    ...TIME_ICONS,
    ...COMMUNICATION_ICONS,
    ...MEDIA_ICONS,
    ...FILE_ICONS,
    ...COMMERCE_ICONS,
    ...PEOPLE_ICONS,
    ...TRANSPORT_ICONS,
    ...DEVICE_ICONS,
    ...OBJECT_ICONS,
] as const;

/** Union of every built-in SF Symbol name. Type-only — no runtime / bundle cost. */
export type CupSfSymbolName = (typeof ALL_ICONS)[number]["name"];

/**
 * Name of an icon for `cup-icon` / `cup-button`.
 *
 * Autocompletes the design system's SF Symbol names; any other string (a direct Lucide name or a
 * manually registered icon) is still accepted via the `(string & {})` fallback. This is autocomplete
 * DX, not strict validation — an unknown name surfaces a dev-time warning from `cup-icon`.
 */
export type CupIconName = CupSfSymbolName | (string & {});
