import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from "@angular/core";
import { LucideDynamicIcon } from "@lucide/angular";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

// Mirrors CupComponentSize from @ngx-cupertino/core
type CupIconSize = "sm" | "md" | "lg";

const SIZE_MAP = {
    sm: 16,
    md: 24,
    lg: 32,
} as const satisfies Record<CupIconSize, number>;

@Component({
    selector: "cup-icon",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideDynamicIcon],
    host: {
        "[attr.aria-hidden]": '!ariaLabel() ? "true" : null',
        "[attr.role]": 'ariaLabel() ? "img" : null',
        "[attr.aria-label]": "ariaLabel()",
        "[class.cup-small]": "size() === 'sm'",
        "[class.cup-large]": "size() === 'lg'",
    },
    template: `
        <svg lucideIcon
            [lucideIcon]="resolvedName()"
            [size]="resolvedSize()"
            [strokeWidth]="strokeWidth()"
            [color]="color()"
            [attr.fill]="isFilled() ? 'currentColor' : 'none'"
        ></svg>
    `,
    styleUrl: "./cup-icon.scss",
})
export class CupIcon {
    readonly name = input.required<string>();

    readonly size = input<CupIconSize | number>("md");

    readonly strokeWidth = input(1.75, { transform: numberAttribute });

    readonly fill = input(false, { transform: booleanAttribute });

    readonly color = input<string>("currentColor");

    readonly ariaLabel = input<string>();

    readonly resolvedName = computed(() => {
        const n = this.name();
        const cleanName = n.replaceAll(".fill", "");
        const map = SF_SYMBOL_MAP as Record<string, string>;
        return map[n] ?? map[cleanName] ?? cleanName;
    });

    readonly isFilled = computed(() => {
        return this.fill() || this.name().endsWith(".fill");
    });

    readonly resolvedSize = computed(() => {
        const s = this.size();
        return typeof s === "number" ? s : SIZE_MAP[s];
    });
}
