import { provideLucideIcons } from "@lucide/angular";
import { LUCIDE_ICONS } from "./lucide-icon-map";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

export function provideCupIcons() {
    const uniqueIcons = [...new Set(Object.values(SF_SYMBOL_MAP))];
    const icons: unknown[] = [];
    for (const name of uniqueIcons) {
        const icon = LUCIDE_ICONS[name];
        if (!icon && typeof ngDevMode !== "undefined" && ngDevMode) {
            console.warn(`[cup-icon] SF_SYMBOL_MAP references "${name}" but missing in LUCIDE_ICONS`);
        }
        if (icon) icons.push(icon);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return provideLucideIcons(...(icons as any));
}
