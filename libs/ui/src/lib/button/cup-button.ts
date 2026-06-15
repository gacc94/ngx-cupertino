import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    effect,
    inject,
    input,
    output,
} from "@angular/core";
import {
    type CupButtonRole,
    type CupButtonShape,
    CupButtonVariant,
    type CupComponentSize,
    type CupIconPosition,
} from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

/**
 * Cupertino push button. Applied to a native `<button>` or `<a>` for correct semantics.
 *
 * Content guidelines (Apple HIG → Buttons):
 * - Use a verb or verb phrase that describes the action ("Add", "Send", "Delete"), not a vague
 *   label like "OK" or "Click here".
 * - Use title case on iOS/iPadOS ("Add to Cart"); keep labels short — one or two words when possible.
 * - No trailing punctuation.
 * - For destructive actions use `role="destructive"` and a label that names the consequence ("Delete").
 * - Icon-only buttons must provide an `ariaLabel`.
 *
 * @example
 * ```html
 * <button cup-button variant="filled" preferred (clicked)="save()">Save</button>
 * <button cup-button role="destructive" icon="trash">Delete</button>
 * <button cup-button variant="plain" iconOnly icon="ellipsis" ariaLabel="More"></button>
 * ```
 */
@Component({
    selector: "button[cup-button], a[cup-button]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    host: {
        "[class.disabled]": "disabled()",
        "[class.loading]": "loading()",
        "[class.full-width]": "fullWidth()",
        "[class.destructive]": "resolvedRole() === 'destructive'",
        "[class.cancel]": "resolvedRole() === 'cancel'",
        "[class.preferred]": "preferred()",
        "[class.icon-only]": "iconOnly()",
        "[class.has-icon]": "!!icon()",

        "[class.sm]": "size() === 'sm'",
        "[class.lg]": "size() === 'lg'",

        "[class.shape-capsule]": "resolvedShape() === 'capsule'",
        "[class.shape-rounded]": "resolvedShape() === 'rounded'",
        "[class.shape-circle]": "resolvedShape() === 'circle'",

        "[class.filled]": "variant() === 'filled'",
        "[class.tinted]": "variant() === 'tinted'",
        "[class.plain]": "variant() === 'plain'",
        "[class.liquid-glass]": "variant() === 'liquid-glass'",
        "[class.glass-prominent]": "variant() === 'glass-prominent'",
        "[class.bordered]": "variant() === 'bordered'",
        "[class.gray]": "variant() === 'gray'",

        "[attr.aria-disabled]": "isInteractionBlocked() ? true : null",
        "[attr.aria-busy]": "loading() ? true : null",
        "[attr.aria-label]": "ariaLabel() || null",
        "[attr.tabindex]": "isInteractionBlocked() ? -1 : null",

        "(click)": "handleClick($event)",
        "(keydown.enter)": "handleClick($event)",
        "(keydown.space.prevent)": "handleClick($event)",
    },
    template: `
        @if (icon() && iconPosition() === 'start') {
            <cup-icon [name]="icon()!" class="icon" />
        }
        @if (!iconOnly()) {
            <span class="label"><ng-content /></span>
        }
        @if (icon() && iconPosition() === 'end') {
            <cup-icon [name]="icon()!" class="icon" />
        }
        @if (loading()) {
            <span class="spinner" aria-hidden="true"></span>
        }
    `,
    styleUrl: "./cup-button.scss",
})
export class CupButton {
    private readonly host = inject(ElementRef<HTMLElement>);

    readonly variant = input<CupButtonVariant>("filled");
    readonly size = input<CupComponentSize>("md");
    readonly shape = input<CupButtonShape>("auto");
    readonly role = input<CupButtonRole>("default");
    /**
     * Marks this as the preferred/default action (Apple `Default / Preferred`): rendered with
     * emphasis. The Return key already activates a focused button; pair with `autofocus` for the
     * full default-action behavior.
     */
    readonly preferred = input(false, { transform: booleanAttribute });
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly loading = input(false, { transform: booleanAttribute });
    /** @deprecated Use `role="destructive"`. Kept for backwards compatibility. */
    readonly destructive = input(false, { transform: booleanAttribute });
    readonly fullWidth = input(false, { transform: booleanAttribute });
    readonly iconOnly = input(false, { transform: booleanAttribute });
    readonly icon = input<string>();
    readonly iconPosition = input<CupIconPosition>("start");
    readonly ariaLabel = input<string>();
    readonly clicked = output<void>();

    protected readonly isInteractionBlocked = computed(() => this.disabled() || this.loading());

    /**
     * Resolved semantic role. The deprecated `destructive` flag maps to `role="destructive"`
     * unless an explicit non-default `role` is provided.
     */
    protected readonly resolvedRole = computed<CupButtonRole>(() => {
        const role = this.role();
        if (role !== "default") {
            return role;
        }
        return this.destructive() ? "destructive" : "default";
    });

    /**
     * Resolved border shape. `auto` defers to platform defaults (capsule on touch, rounded on
     * desktop via the `radius-button` token) but icon-only buttons resolve to `circle`, matching
     * Apple's circular icon buttons on iOS and macOS.
     */
    protected readonly resolvedShape = computed<CupButtonShape>(() => {
        const shape = this.shape();
        if (shape !== "auto") {
            return shape;
        }
        return this.iconOnly() ? "circle" : "auto";
    });

    constructor() {
        effect(() => {
            const host = this.host.nativeElement;

            if (host.tagName === "BUTTON") {
                (host as HTMLButtonElement).disabled = this.isInteractionBlocked();
            }
        });
    }

    protected handleClick(event: Event): void {
        if (this.isInteractionBlocked()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.clicked.emit();
    }
}
