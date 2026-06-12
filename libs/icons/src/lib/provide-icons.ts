import { InjectionToken, type Provider } from "@angular/core";
import { type LucideIcon, type LucideIconData, provideLucideIcons } from "@lucide/angular";
import { type CupBuiltInIconName, LUCIDE_ICONS } from "./lucide-icon-map";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

export interface ProvideCupIconsOptions {
    names?: readonly CupBuiltInIconName[];
}

export const CUP_ICON_REGISTRY = new InjectionToken<ReadonlySet<string>>("@ngx-cupertino/icons registry");

const DEFAULT_ICON_NAMES = [...new Set(Object.values(SF_SYMBOL_MAP))] as readonly CupBuiltInIconName[];

export function provideCupIcons(options: ProvideCupIconsOptions = {}): Provider[] {
    const requestedNames = options.names ? [...new Set(options.names)] : DEFAULT_ICON_NAMES;
    const icons: (LucideIcon | LucideIconData)[] = [];
    const registeredNames = new Set<string>();

    for (const name of requestedNames) {
        const icon = LUCIDE_ICONS[name];
        if (!icon) {
            if (typeof ngDevMode !== "undefined" && ngDevMode) {
                console.warn(`[cup-icon] provideCupIcons() received unknown built-in icon name "${name}".`);
            }
            continue;
        }

        registeredNames.add(name);
        icons.push(icon);
    }

    return [{ provide: CUP_ICON_REGISTRY, useValue: registeredNames }, provideLucideIcons(...icons)];
}
