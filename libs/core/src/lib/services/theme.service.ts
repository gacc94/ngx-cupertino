import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
    readonly theme = signal<"light" | "dark">("light");
    readonly isDark = computed(() => this.theme() === "dark");
    readonly currentTint = signal("#007AFF");

    private mediaQuery?: MediaQueryList;
    private mediaListener?: (e: MediaQueryListEvent) => void;

    setTheme(theme: "light" | "dark" | "auto"): void {
        this.cleanupAutoListener();
        if (theme === "auto") {
            this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const resolved = this.mediaQuery.matches ? "dark" : "light";
            this.applyTheme(resolved);
            this.mediaListener = (e: MediaQueryListEvent) => {
                this.applyTheme(e.matches ? "dark" : "light");
            };
            this.mediaQuery.addEventListener("change", this.mediaListener);
        } else {
            this.applyTheme(theme);
        }
    }

    toggle(): void {
        this.applyTheme(this.isDark() ? "light" : "dark");
    }

    setTint(color: string): void {
        this.currentTint.set(color);
        const root = document.documentElement;
        root.style.setProperty("--cup-tint", color);
        root.style.setProperty("--cup-tint-subtle", this.toAlpha(color, 0.15));
        root.style.setProperty("--cup-tint-container", this.toAlpha(color, 0.12));
        root.style.setProperty("--cup-tint-on", this.contrastColor(color));
        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        root.dataset["tint"] = color;
    }

    private applyTheme(th: "light" | "dark"): void {
        this.theme.set(th);
        // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for custom data-* attributes
        document.documentElement.dataset["theme"] = th;
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
