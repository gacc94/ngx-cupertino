import { InjectionToken, type Provider } from "@angular/core";
import type { LucideIcon } from "@lucide/angular";
import type { CupIconDef } from "./icon-set";

/** Registry of registered icons, keyed by SF Symbol name. `cup-icon` resolves the glyph from here. */
export const CUP_ICON_REGISTRY = new InjectionToken<ReadonlyMap<string, LucideIcon>>("@ngx-cupertino/icons registry");

/**
 * Registers the given icons so `cup-icon` / `cup-button` can render them by `name`.
 *
 * Import only the icons you use and pass them here — the bundle grows on demand (tree-shaking):
 *
 * ```ts
 * import { provideCupIcons, houseIcon, starFillIcon } from "@ngx-cupertino/icons";
 *
 * providers: [provideCupIcons(houseIcon, starFillIcon)];
 * // <cup-icon name="house" />
 * ```
 *
 * @param defs The icon definitions to register (e.g. `houseIcon`).
 */
export function provideCupIcons(...defs: readonly CupIconDef[]): Provider[] {
    const registry = new Map<string, LucideIcon>();
    for (const def of defs) {
        registry.set(def.name, def.icon);
    }
    return [{ provide: CUP_ICON_REGISTRY, useValue: registry }];
}
