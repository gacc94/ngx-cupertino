import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject, signal } from "@angular/core";
import { type CupTintInput, type CupTintPalette, isCupTintName } from "../constants/colors";
import { CUP_DATASET_KEYS, setCupDataset } from "../constants/dom-attributes";
import { DEFAULT_CUP_CONFIG } from "../providers/cupertino-default-config";
import type { CupThemeMode } from "../types/cupertino-config.types";

/**
 * Runtime facade for global theme mode and tint synchronization.
 *
 * The service resolves system color preferences when `theme = auto`, stores the active
 * resolved mode in signals, and projects the resulting state to `<html data-mode>` and
 * `<html data-tint>`.
 */
@Injectable({ providedIn: "root" })
export class ThemeService {
    readonly theme = signal<"light" | "dark">("light");
    readonly isDark = computed(() => this.theme() === "dark");
    readonly currentTint = signal<CupTintInput>(DEFAULT_CUP_CONFIG.tintColor);

    private readonly document = inject(DOCUMENT);

    private themeMediaQuery?: MediaQueryList;
    private themeMediaListener?: (e: MediaQueryListEvent) => void;
    private contrastMediaQuery?: MediaQueryList;
    private contrastMediaListener?: (e: MediaQueryListEvent) => void;

    /**
     * Sets the current theme mode or follows the system preference when `auto` is used.
     *
     * @param mode The requested theme mode.
     */
    setTheme(mode: CupThemeMode): void {
        this.cleanupThemeAutoListener();

        if (mode === "auto") {
            const win = this.document.defaultView;
            if (win && typeof win.matchMedia === "function") {
                this.themeMediaQuery = win.matchMedia("(prefers-color-scheme: dark)");
                const resolved = this.themeMediaQuery.matches ? "dark" : "light";
                this.applyMode(resolved);
                this.themeMediaListener = (e: MediaQueryListEvent) => {
                    this.applyMode(e.matches ? "dark" : "light");
                };
                this.themeMediaQuery.addEventListener("change", this.themeMediaListener);
                return;
            }

            this.applyMode("light");
            return;
        }

        this.applyMode(mode);
    }

    /**
     * Toggles between resolved light and dark modes, disabling any active auto listener.
     */
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
        this.applyTint(tint);
    }

    private applyMode(mode: "light" | "dark"): void {
        this.theme.set(mode);
        setCupDataset(this.document.documentElement, "mode", mode);
        this.applyTint(this.currentTint());
    }

    private cleanupThemeAutoListener(): void {
        if (this.themeMediaQuery && this.themeMediaListener) {
            this.themeMediaQuery.removeEventListener("change", this.themeMediaListener);
        }
        this.themeMediaQuery = undefined;
        this.themeMediaListener = undefined;
    }

    private ensureContrastListener(): void {
        if (this.contrastMediaQuery || typeof this.currentTint() !== "object") {
            return;
        }

        const win = this.document.defaultView;
        if (!win || typeof win.matchMedia !== "function") {
            return;
        }

        this.contrastMediaQuery = win.matchMedia("(prefers-contrast: more)");
        this.contrastMediaListener = () => {
            this.applyTint(this.currentTint());
        };
        this.contrastMediaQuery.addEventListener("change", this.contrastMediaListener);
    }

    private cleanupContrastListener(): void {
        if (this.contrastMediaQuery && this.contrastMediaListener) {
            this.contrastMediaQuery.removeEventListener("change", this.contrastMediaListener);
        }
        this.contrastMediaQuery = undefined;
        this.contrastMediaListener = undefined;
    }

    private applyTint(tint: CupTintInput): void {
        const root = this.document.documentElement;

        if (typeof tint === "string" && isCupTintName(tint)) {
            this.cleanupContrastListener();
            this.clearCustomTint(root);
            setCupDataset(root, "tint", tint);
            return;
        }

        if (typeof tint === "string") {
            this.cleanupContrastListener();
        } else {
            this.ensureContrastListener();
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
        if (this.isHighContrastPreferred()) {
            if (this.isDark()) {
                return tint.darkHighContrast ?? tint.dark;
            }

            return tint.lightHighContrast ?? tint.light;
        }

        return this.isDark() ? tint.dark : tint.light;
    }

    private isHighContrastPreferred(): boolean {
        return this.contrastMediaQuery?.matches ?? false;
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
