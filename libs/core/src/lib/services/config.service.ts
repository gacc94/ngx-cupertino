import { computed, Injectable, inject, signal } from "@angular/core";
import type { CupTintInput } from "../constants/colors";
import {
    CUP_CONFIG,
    type CupA11yConfig,
    type CupButtonDefaults,
    type CupConfig,
    type CupThemeMode,
} from "../providers/cupertino.provider";

function mergeConfig(current: CupConfig, partial: Partial<CupConfig>): CupConfig {
    return {
        ...current,
        ...partial,
        defaults: {
            ...current.defaults,
            ...partial.defaults,
            button: {
                ...current.defaults?.button,
                ...partial.defaults?.button,
            },
        },
        a11y: {
            ...current.a11y,
            ...partial.a11y,
        },
    };
}

@Injectable({ providedIn: "root" })
export class CupConfigService {
    readonly config = signal<CupConfig>(inject(CUP_CONFIG, { optional: true }) ?? {});
    readonly theme = computed<CupThemeMode>(() => this.config().theme ?? "auto");
    readonly tintColor = computed<CupTintInput>(() => this.config().tintColor ?? "blue");
    readonly direction = computed<"ltr" | "rtl">(() => this.config().direction ?? "ltr");
    readonly buttonDefaults = computed<CupButtonDefaults>(() => this.config().defaults?.button ?? {});
    readonly a11y = computed<CupA11yConfig>(() => this.config().a11y ?? {});

    updateConfig(partial: Partial<CupConfig>): void {
        this.config.update((current) => mergeConfig(current, partial));
    }
}
