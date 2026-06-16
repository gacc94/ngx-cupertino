// Built-in icon set, split by category under `./icons/*`. Each category file owns its icon defs
// (standalone named exports, tree-shakeable) plus a group array. This barrel re-exports every icon
// and assembles `ALL_ICONS` from the group arrays — add an icon in one place, its category file.

export * from "./categories/actions";
export * from "./categories/arrows";
export * from "./categories/commerce";
export * from "./categories/communication";
export * from "./categories/devices";
export * from "./categories/files";
export * from "./categories/media";
export * from "./categories/navigation";
export * from "./categories/objects";
export * from "./categories/people";
export * from "./categories/status";
export * from "./categories/time";
export * from "./categories/transport";

import type { CupIconDef } from "./categories/types";

export type { CupIconDef } from "./categories/types";
export * from "./categories/weather";

import { ACTION_ICONS } from "./categories/actions";
import { ARROW_ICONS } from "./categories/arrows";
import { COMMERCE_ICONS } from "./categories/commerce";
import { COMMUNICATION_ICONS } from "./categories/communication";
import { DEVICE_ICONS } from "./categories/devices";
import { FILE_ICONS } from "./categories/files";
import { MEDIA_ICONS } from "./categories/media";
import { NAVIGATION_ICONS } from "./categories/navigation";
import { OBJECT_ICONS } from "./categories/objects";
import { PEOPLE_ICONS } from "./categories/people";
import { STATUS_ICONS } from "./categories/status";
import { TIME_ICONS } from "./categories/time";
import { TRANSPORT_ICONS } from "./categories/transport";
import { WEATHER_ICONS } from "./categories/weather";

/**
 * Every built-in icon. **Only import this in tooling/galleries (Storybook), never in app code** —
 * it references every icon and would defeat tree-shaking. App code imports individual icons.
 *
 * Assembled with `.concat` (not array spread) behind a `/*@__PURE__*\/` annotation: spread elements
 * are an iterator call that bundlers treat as a side effect, which would keep `ALL_ICONS` (and every
 * icon it references) in the bundle even when unused. The annotated `.concat` is provably pure, so an
 * app that never imports `ALL_ICONS` tree-shakes it — and the whole set — away.
 */
export const ALL_ICONS: readonly CupIconDef[] = /*@__PURE__*/ (NAVIGATION_ICONS as readonly CupIconDef[]).concat(
    ARROW_ICONS,
    ACTION_ICONS,
    STATUS_ICONS,
    WEATHER_ICONS,
    TIME_ICONS,
    COMMUNICATION_ICONS,
    MEDIA_ICONS,
    FILE_ICONS,
    COMMERCE_ICONS,
    PEOPLE_ICONS,
    TRANSPORT_ICONS,
    DEVICE_ICONS,
    OBJECT_ICONS,
);

/**
 * Union of every built-in SF Symbol name. Derived from the group tuples' element types, not from
 * `ALL_ICONS` (whose runtime `.concat` widens `name` to `string`). Type-only — zero runtime cost.
 */
type AnyIconDef =
    | (typeof NAVIGATION_ICONS)[number]
    | (typeof ARROW_ICONS)[number]
    | (typeof ACTION_ICONS)[number]
    | (typeof STATUS_ICONS)[number]
    | (typeof WEATHER_ICONS)[number]
    | (typeof TIME_ICONS)[number]
    | (typeof COMMUNICATION_ICONS)[number]
    | (typeof MEDIA_ICONS)[number]
    | (typeof FILE_ICONS)[number]
    | (typeof COMMERCE_ICONS)[number]
    | (typeof PEOPLE_ICONS)[number]
    | (typeof TRANSPORT_ICONS)[number]
    | (typeof DEVICE_ICONS)[number]
    | (typeof OBJECT_ICONS)[number];
export type CupSfSymbolName = AnyIconDef["name"];

/**
 * Name of an icon for `cup-icon` / `cup-button`.
 *
 * Autocompletes the design system's SF Symbol names; any other string (a direct Lucide name or a
 * manually registered icon) is still accepted via the `(string & {})` fallback. This is autocomplete
 * DX, not strict validation — an unknown name surfaces a dev-time warning from `cup-icon`.
 */
export type CupIconName = CupSfSymbolName | (string & {});
