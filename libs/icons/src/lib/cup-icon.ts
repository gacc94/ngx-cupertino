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

/**
 * Named icon size. Mirrors `CupComponentSize` from `@ngx-cupertino/core` by design: `icons`
 * keeps an Angular `>=18` baseline and cannot peer-depend on `core` (which requires `>=21`),
 * so this trivial literal union is duplicated rather than imported. Keep both in sync.
 */
export type CupIconSize = "sm" | "md" | "lg";

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
        <svg
            [lucideIcon]="resolvedName()"
            [size]="resolvedSize()"
            [strokeWidth]="strokeWidth()"
            [color]="color()"
            [attr.fill]="isFilled() ? 'currentColor' : 'none'"
            focusable="false"
        ></svg>
    `,
    styleUrl: "./cup-icon.scss",
})
export class CupIcon {
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

    /**
     * Whether the icon renders filled. Note: Lucide is an outline set with no native filled
     * variants, so fill is approximated by painting the stroke path with `currentColor`. This
     * reads well on solid shapes (heart, star, circles) but can look heavy on icons with interior
     * cutouts (bell, house, folder). See ARCHITECTURE.md → `.fill` Semantics.
     */
    readonly isFilled = computed(() => {
        return this.fill() || this.name().endsWith(".fill");
    });

    /**
     * Numeric pixel size forwarded to Lucide's `[size]`, or `undefined` for named sizes.
     * Named sizes are dimensioned by the host element through token-driven CSS (`cup-icon.scss`),
     * with the SVG filling the host at 100% — a single source of truth (see ARCHITECTURE.md → Sizing).
     */
    readonly resolvedSize = computed<number | undefined>(() => {
        const s = this.size();
        return typeof s === "number" ? s : undefined;
    });

    readonly customSizeStyle = computed(() => {
        const s = this.size();
        return typeof s === "number" ? `${s}px` : null;
    });

    private readonly registeredIconNames = inject(CUP_ICON_REGISTRY, { optional: true });
    private readonly warnedRegistrationMismatches = new Set<string>();

    constructor() {
        // Dev-only: warn when an icon resolves to a known built-in that was never registered
        // through provideCupIcons(). Re-runs if `name` changes; compiled out in production.
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
}
