import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from "@angular/core";
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

        "[class.sm]": "size() === 'sm'",
        "[class.lg]": "size() === 'lg'",

        "[class.filled]": "variant() === 'filled'",
        "[class.tinted]": "variant() === 'tinted'",
        "[class.plain]": "variant() === 'plain'",
        "[class.liquid-glass]": "variant() === 'liquid-glass'",
        "[class.gray]": "variant() === 'gray'",

        "[attr.aria-disabled]": "disabled() ? true : null",
        "[attr.aria-busy]": "loading() ? true : null",

        "(click)": "handleClick()",
        "(keydown.enter)": "handleClick()",
        "(keydown.space.prevent)": "handleClick()",
    },
    template: `
        @if (icon() && iconPosition() === 'start') {
            <cup-icon [name]="icon()!" class="cup-btn-icon" />
        }
        <span class="cup-btn-label"><ng-content /></span>
        @if (icon() && iconPosition() === 'end') {
            <cup-icon [name]="icon()!" class="cup-btn-icon" />
        }
        @if (loading()) {
            <span class="cup-btn-spinner"></span>
        }
    `,
    styleUrl: "./cup-button.scss",
})
export class CupButton {
    readonly variant = input<CupButtonVariant>("filled");
    readonly size = input<CupComponentSize>("md");
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly loading = input(false, { transform: booleanAttribute });
    readonly destructive = input(false, { transform: booleanAttribute });
    readonly fullWidth = input(false, { transform: booleanAttribute });
    readonly icon = input<string>();
    readonly iconPosition = input<CupIconPosition>("start");
    readonly clicked = output<void>();

    protected handleClick(): void {
        if (!this.disabled() && !this.loading()) {
            this.clicked.emit();
        }
    }
}
