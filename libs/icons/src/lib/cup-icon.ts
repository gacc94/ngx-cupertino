import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    numberAttribute,
} from "@angular/core";
import { LucideDynamicIcon } from "@lucide/angular";
import { LUCIDE_ICONS } from "./lucide-icon-map";
import { CUP_ICON_REGISTRY } from "./provide-icons";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

// Mirrors CupComponentSize from @ngx-cupertino/core
export type CupIconSize = "sm" | "md" | "lg";

const SIZE_MAP = {
    sm: "var(--cup-icon-size-sm)",
    md: "var(--cup-icon-size)",
    lg: "var(--cup-icon-size-lg)",
} as const satisfies Record<CupIconSize, string>;

function iconSizeAttribute(value: CupIconSize | number | string | null | undefined): CupIconSize | number {
    if (typeof value === "number") return value;
    if (value == null) return "md";

    const normalizedValue = `${value}`.trim();
    if (normalizedValue === "sm" || normalizedValue === "md" || normalizedValue === "lg") {
        return normalizedValue;
    }

    const numericValue = Number(normalizedValue);
    return Number.isFinite(numericValue) ? numericValue : "md";
}

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
        "[style.width]": "customSizeStyle()",
        "[style.height]": "customSizeStyle()",
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
    private readonly registeredIconNames = inject(CUP_ICON_REGISTRY, { optional: true });
    private readonly warnedRegistrationMismatches = new Set<string>();

    constructor() {
        effect(() => {
            const registry = this.registeredIconNames;
            if (!registry || typeof ngDevMode === "undefined" || !ngDevMode) return;

            const inputName = this.name();
            const resolvedName = this.resolvedName();
            if (registry.has(resolvedName)) return;

            const cleanName = inputName.replaceAll(".fill", "");
            const isMappedSfSymbol = cleanName in SF_SYMBOL_MAP || inputName in SF_SYMBOL_MAP;
            const isBuiltInLucideName = resolvedName in LUCIDE_ICONS;
            if (!isMappedSfSymbol && !isBuiltInLucideName) return;

            const warningKey = `${inputName}->${resolvedName}`;
            if (this.warnedRegistrationMismatches.has(warningKey)) return;

            this.warnedRegistrationMismatches.add(warningKey);
            console.warn(
                `[cup-icon] "${inputName}" resolved to built-in icon "${resolvedName}", but it was not registered by provideCupIcons(). ` +
                    `Include it in provideCupIcons({ names: [...] }) or register it manually via provideLucideIcons().`,
            );
        });
    }

    readonly name = input.required<string>();

    readonly size = input<CupIconSize | number, CupIconSize | number | string | null | undefined>("md", {
        transform: iconSizeAttribute,
    });

    readonly strokeWidth = input(1.75, { transform: numberAttribute });

    readonly fill = input(false, { transform: booleanAttribute });

    readonly color = input<string>("currentColor");

    readonly ariaLabel = input<string>();

    readonly resolvedName = computed(() => {
        const n = this.name();
        const cleanName = n.replaceAll(".fill", "");
        return (
            SF_SYMBOL_MAP[n as keyof typeof SF_SYMBOL_MAP] ??
            SF_SYMBOL_MAP[cleanName as keyof typeof SF_SYMBOL_MAP] ??
            cleanName
        );
    });

    readonly isFilled = computed(() => {
        return this.fill() || this.name().endsWith(".fill");
    });

    readonly resolvedSize = computed(() => {
        const s = this.size();
        return typeof s === "number" ? s : SIZE_MAP[s];
    });

    readonly customSizeStyle = computed(() => {
        const s = this.size();
        return typeof s === "number" ? `${s}px` : null;
    });
}
