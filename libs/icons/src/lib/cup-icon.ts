import { Component, computed, input, isDevMode } from "@angular/core";
import { LucideDynamicIcon } from "@lucide/angular";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

type CupIconSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<CupIconSize, number> = {
    sm: 16,
    md: 24,
    lg: 32,
};

@Component({
    selector: "cup-icon",
    standalone: true,
    imports: [LucideDynamicIcon],
    template: `
        <svg lucideIcon
            [lucideIcon]="resolvedName()"
            [size]="resolvedSize()"
            [strokeWidth]="strokeWidth()"
            [color]="color()"
            [attr.fill]="isFilled() ? 'currentColor' : 'none'"
        ></svg>
    `,
    styles: [
        `
            :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                color: var(--cup-label);
                line-height: 0;
                flex-shrink: 0;
            }
        `,
    ],
    host: {
        "[attr.aria-hidden]": '!ariaLabel() ? "true" : null',
        "[attr.role]": 'ariaLabel() ? "img" : null',
        "[attr.aria-label]": "ariaLabel()",
    },
})
export class CupIcon {
    readonly name = input.required<string>();

    readonly size = input<CupIconSize | number>("md");

    readonly strokeWidth = input<number>(1.75);

    readonly fill = input<boolean>(false);

    readonly color = input<string>("currentColor");

    readonly ariaLabel = input<string>();

    readonly resolvedName = computed(() => {
        const n = this.name();
        const cleanName = n.replace(".fill", "");
        return SF_SYMBOL_MAP[n] ?? SF_SYMBOL_MAP[cleanName] ?? cleanName;
    });

    readonly isFilled = computed(() => {
        return this.fill() || this.name().endsWith(".fill");
    });

    readonly resolvedSize = computed(() => {
        const s = this.size();
        return typeof s === "number" ? s : SIZE_MAP[s];
    });

    constructor() {
        if (isDevMode()) {
            // Note: provideCupIcons() must be called in app.config.ts
            // to register icons globally via provideLucideIcons().
        }
    }
}
