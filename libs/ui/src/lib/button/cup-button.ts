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
import { CupButtonVariant, type CupComponentSize, type CupIconPosition } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

@Component({
    selector: "button[cup-button], a[cup-button]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    host: {
        "[class.disabled]": "disabled()",
        "[class.loading]": "loading()",
        "[class.full-width]": "fullWidth()",
        "[class.destructive]": "destructive()",
        "[class.icon-only]": "iconOnly()",
        "[class.has-icon]": "!!icon()",

        "[class.sm]": "size() === 'sm'",
        "[class.lg]": "size() === 'lg'",

        "[class.filled]": "variant() === 'filled'",
        "[class.tinted]": "variant() === 'tinted'",
        "[class.plain]": "variant() === 'plain'",
        "[class.liquid-glass]": "variant() === 'liquid-glass'",
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
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly loading = input(false, { transform: booleanAttribute });
    readonly destructive = input(false, { transform: booleanAttribute });
    readonly fullWidth = input(false, { transform: booleanAttribute });
    readonly iconOnly = input(false, { transform: booleanAttribute });
    readonly icon = input<string>();
    readonly iconPosition = input<CupIconPosition>("start");
    readonly ariaLabel = input<string>();
    readonly clicked = output<void>();

    protected readonly isInteractionBlocked = computed(() => this.disabled() || this.loading());

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
