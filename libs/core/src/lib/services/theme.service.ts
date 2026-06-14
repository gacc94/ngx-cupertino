import { BreakpointObserver } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { computed, effect, Injectable, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { type CupTintInput, type CupTintPalette, isCupTintName } from "../constants/colors";
import { CUP_DATASET_KEYS, setCupDataset } from "../constants/dom-attributes";
import { DEFAULT_CUP_CONFIG } from "../providers/cupertino-default-config";
import type { CupThemeMode } from "../types/cupertino-config.types";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const HIGH_CONTRAST_QUERY = "(prefers-contrast: more)";

/**
 * Runtime facade for global theme mode and tint synchronization.
 *
 * The service is signal-first: system color and contrast preferences are observed through the
 * CDK {@link BreakpointObserver} (which tears down its subscriptions automatically), the
 * resolved mode and tint live in signals, and an {@link effect} projects the resulting state to
 * `<html data-mode>` / `<html data-tint>`. There is no manual `addEventListener` bookkeeping.
 */
@Injectable()
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly breakpointObserver = inject(BreakpointObserver);

    /** The mode requested by the consumer; `auto` defers to the system preference. */
    private readonly requestedMode = signal<CupThemeMode>(DEFAULT_CUP_CONFIG.theme);

    private readonly prefersDark = toSignal(this.breakpointObserver.observe(DARK_SCHEME_QUERY), {
        initialValue: { matches: false, breakpoints: { [DARK_SCHEME_QUERY]: false } },
    });
    private readonly prefersHighContrast = toSignal(this.breakpointObserver.observe(HIGH_CONTRAST_QUERY), {
        initialValue: { matches: false, breakpoints: { [HIGH_CONTRAST_QUERY]: false } },
    });

    /** Whether the resolved theme is dark, taking system preference into account when `auto`. */
    readonly isDark = computed(
        () => this.requestedMode() === "dark" || (this.requestedMode() === "auto" && this.prefersDark().matches),
    );

    /** Whether the user prefers an increased-contrast palette. */
    readonly isHighContrast = computed(() => this.prefersHighContrast().matches);

    /** The resolved concrete theme mode. */
    readonly theme = computed<"light" | "dark">(() => (this.isDark() ? "dark" : "light"));

    readonly currentTint = signal<CupTintInput>(DEFAULT_CUP_CONFIG.tintColor);

    constructor() {
        effect(() => {
            setCupDataset(this.document.documentElement, "mode", this.theme());
            this.applyTint(this.currentTint());
        });
    }

    /**
     * Sets the requested theme mode. `auto` follows the system color-scheme preference.
     *
     * @param mode The requested theme mode.
     */
    setTheme(mode: CupThemeMode): void {
        this.requestedMode.set(mode);
    }

    /** Toggles between resolved light and dark modes, leaving `auto` behind. */
    toggle(): void {
        this.setTheme(this.isDark() ? "light" : "dark");
    }

    /**
     * Sets the active design-system tint.
     *
     * @param tint A named tint or a custom palette.
     */
    setTint(tint: CupTintInput): void {
        this.currentTint.set(tint);
    }

    private applyTint(tint: CupTintInput): void {
        const root = this.document.documentElement;

        if (typeof tint === "string" && isCupTintName(tint)) {
            this.clearCustomTint(root);
            setCupDataset(root, "tint", tint);
            return;
        }

        const palette = typeof tint === "string" ? { light: tint, dark: tint } : tint;
        const resolvedTint = this.resolveTintForContext(palette);
        root.style.setProperty("--cup-tint", resolvedTint);
        root.style.setProperty("--cup-tint-subtle", this.toAlpha(resolvedTint, 0.15));
        root.style.setProperty("--cup-tint-container", this.toAlpha(resolvedTint, 0.12));
        root.style.setProperty("--cup-tint-on", this.contrastColor(resolvedTint));
        root.dataset[CUP_DATASET_KEYS.tint] = "custom";
    }

    private clearCustomTint(root: HTMLElement): void {
        root.style.removeProperty("--cup-tint");
        root.style.removeProperty("--cup-tint-subtle");
        root.style.removeProperty("--cup-tint-container");
        root.style.removeProperty("--cup-tint-on");
    }

    private resolveTintForContext(tint: CupTintPalette): `#${string}` {
        if (this.isHighContrast()) {
            if (this.isDark()) {
                return tint.darkHighContrast ?? tint.dark;
            }

            return tint.lightHighContrast ?? tint.light;
        }

        return this.isDark() ? tint.dark : tint.light;
    }

    private toAlpha(hex: string, a: number): string {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${a})`;
    }

    private contrastColor(hex: string): string {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#FFFFFF";
    }
}
