import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject, signal } from "@angular/core";
import { type CupTintInput, type CupTintPalette, isCupTintName } from "../constants/colors";
import type { CupThemeMode } from "../providers/cupertino.provider";

@Injectable({ providedIn: "root" })
export class ThemeService {
    readonly theme = signal<"light" | "dark">("light");
    readonly isDark = computed(() => this.theme() === "dark");
    readonly currentTint = signal<CupTintInput>("blue");

    private readonly document = inject(DOCUMENT);

    private mediaQuery?: MediaQueryList;
    private mediaListener?: (e: MediaQueryListEvent) => void;

    setTheme(mode: CupThemeMode): void {
        this.cleanupAutoListener();
        if (mode === "auto") {
            const win = this.document.defaultView;
            if (win) {
                this.mediaQuery = win.matchMedia("(prefers-color-scheme: dark)");
                const resolved = this.mediaQuery.matches ? "dark" : "light";
                this.applyMode(resolved);
                this.mediaListener = (e: MediaQueryListEvent) => {
                    this.applyMode(e.matches ? "dark" : "light");
                };
                this.mediaQuery.addEventListener("change", this.mediaListener);
            }
        } else {
            this.applyMode(mode);
        }
    }

    toggle(): void {
        this.applyMode(this.isDark() ? "light" : "dark");
    }

    setTint(tint: CupTintInput): void {
        this.currentTint.set(tint);
        this.applyTint(tint);
    }

    private applyMode(mode: "light" | "dark"): void {
        this.theme.set(mode);
        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        this.document.documentElement.dataset["mode"] = mode;
        this.applyTint(this.currentTint());
    }

    private cleanupAutoListener(): void {
        if (this.mediaQuery && this.mediaListener) {
            this.mediaQuery.removeEventListener("change", this.mediaListener);
        }
        this.mediaQuery = undefined;
        this.mediaListener = undefined;
    }

    private applyTint(tint: CupTintInput): void {
        const root = this.document.documentElement;

        if (typeof tint === "string" && isCupTintName(tint)) {
            this.clearCustomTint(root);
            // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
            root.dataset["tint"] = tint;
            return;
        }

        const palette = typeof tint === "string" ? { light: tint, dark: tint } : tint;
        const resolvedTint = this.resolveTintForTheme(palette);
        root.style.setProperty("--cup-tint", resolvedTint);
        root.style.setProperty("--cup-tint-subtle", this.toAlpha(resolvedTint, 0.15));
        root.style.setProperty("--cup-tint-container", this.toAlpha(resolvedTint, 0.12));
        root.style.setProperty("--cup-tint-on", this.contrastColor(resolvedTint));
        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        root.dataset["tint"] = "custom";
    }

    private clearCustomTint(root: HTMLElement): void {
        root.style.removeProperty("--cup-tint");
        root.style.removeProperty("--cup-tint-subtle");
        root.style.removeProperty("--cup-tint-container");
        root.style.removeProperty("--cup-tint-on");
    }

    private resolveTintForTheme(tint: CupTintPalette): `#${string}` {
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
