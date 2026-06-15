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
import { LucideDynamicIcon, type LucideIcon } from "@lucide/angular";
import type { CupIconName } from "./icon-set";
import { CUP_ICON_REGISTRY } from "./provide-icons";

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
        @if (resolvedIcon(); as icon) {
            <svg
                [lucideIcon]="icon"
                [size]="resolvedSize()"
                [strokeWidth]="strokeWidth()"
                [color]="color()"
                [attr.fill]="isFilled() ? 'currentColor' : 'none'"
                focusable="false"
            ></svg>
        }
    `,
    styleUrl: "./cup-icon.scss",
})
export class CupIcon {
    readonly name = input.required<CupIconName>();

    readonly size = input<CupIconSize | number, CupIconSize | number | string | null | undefined>("md", {
        transform: iconSizeAttribute,
    });

    readonly strokeWidth = input(1.75, { transform: numberAttribute });

    readonly fill = input(false, { transform: booleanAttribute });

    readonly color = input<string>("currentColor");

    readonly ariaLabel = input<string>();

    /**
     * The resolved Lucide glyph for `[lucideIcon]`, looked up from the registry by name (the `.fill`
     * suffix is stripped first), or `undefined` if not registered (the SVG is then not rendered and
     * a dev warning fires). `LucideDynamicIcon` receives the glyph data directly, so no global icon
     * map is pulled into the bundle.
     */
    readonly resolvedIcon = computed<LucideIcon | undefined>(() => {
        const registry = this.registry;
        const n = this.name();
        const cleanName = n.replaceAll(".fill", "");
        return registry?.get(n) ?? registry?.get(cleanName);
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

    private readonly registry = inject(CUP_ICON_REGISTRY, { optional: true });
    private readonly warnedNames = new Set<string>();

    constructor() {
        // Dev-only: warn when a name is not registered (so it cannot render). Re-runs if `name`
        // changes; compiled out in production.
        effect(() => {
            if (typeof ngDevMode === "undefined" || !ngDevMode) return;

            const name = this.name();
            if (this.resolvedIcon() !== undefined || this.warnedNames.has(name)) return;

            this.warnedNames.add(name);
            console.warn(
                `[cup-icon] "${name}" is not registered. Import the icon and pass it to ` +
                    `provideCupIcons(...) — e.g. provideCupIcons(starFillIcon).`,
            );
        });
    }
}
