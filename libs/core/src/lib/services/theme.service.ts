import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
    readonly theme = signal<"light" | "dark">("light");
    readonly isDark = computed(() => this.theme() === "dark");
    readonly currentTint = signal("blue");

    private readonly document = inject(DOCUMENT);

    private mediaQuery?: MediaQueryList;
    private mediaListener?: (e: MediaQueryListEvent) => void;

    setTheme(mode: "light" | "dark" | "auto"): void {
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

    setTint(tintName: string): void {
        this.currentTint.set(tintName);
        const root = this.document.documentElement;

        if (tintName.startsWith("#")) {
            root.style.setProperty("--cup-tint", tintName);
            root.style.setProperty("--cup-tint-subtle", this.toAlpha(tintName, 0.15));
            root.style.setProperty("--cup-tint-container", this.toAlpha(tintName, 0.12));
            root.style.setProperty("--cup-tint-on", this.contrastColor(tintName));
        }

        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        root.dataset["tint"] = tintName;
    }

    private applyMode(mode: "light" | "dark"): void {
        this.theme.set(mode);
        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        this.document.documentElement.dataset["mode"] = mode;
    }

    private cleanupAutoListener(): void {
        if (this.mediaQuery && this.mediaListener) {
            this.mediaQuery.removeEventListener("change", this.mediaListener);
        }
        this.mediaQuery = undefined;
        this.mediaListener = undefined;
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
