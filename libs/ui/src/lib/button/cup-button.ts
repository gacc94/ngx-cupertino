import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { CupIcon } from "@ngx-cupertino/icons";

@Component({
    selector: "button[cup-button]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    host: {
        "[class.cup-disabled]": "disabled()",
        "[class.cup-loading]": "loading()",
        "[class.cup-small]": "size() === 'sm'",
        "[class.cup-large]": "size() === 'lg'",
        "[class.cup-full-width]": "fullWidth()",
        "[class.liquid-glass]": "variant() === 'liquid-glass'",
        "[class.tinted]": "variant() === 'tinted'",
        "[class.filled]": "variant() === 'filled'",
        "[class.plain]": "variant() === 'plain'",
        "[attr.aria-disabled]": "disabled() ? true : null",
        "[attr.aria-busy]": "loading() ? true : null",
        "(click)": "handleClick()",
        "(keydown.enter)": "handleClick()",
        "(keydown.space.prevent)": "handleClick()",
    },
    template: `
        @if (icon() && iconPosition() === 'start') {
            <cup-icon [name]="icon()!" class="cup-icon" />
        }
        <span class="cup-label"><ng-content /></span>
        @if (icon() && iconPosition() === 'end') {
            <cup-icon [name]="icon()!" class="cup-icon" />
        }
        @if (loading()) {
            <span class="cup-spinner"></span>
        }
    `,
    styles: [
        `
            :host {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: var(--cup-spacing-2);
                min-height: 44px;
                padding: var(--cup-spacing-3) var(--cup-spacing-5);
                border: none;
                border-radius: var(--cup-radius-md);
                font-family: var(--cup-font-family);
                font-size: var(--cup-font-size-body);
                font-weight: var(--cup-font-weight-medium);
                cursor: pointer;
                user-select: none;
                transition: opacity var(--cup-duration-fast) var(--cup-easing-default),
                    background var(--cup-duration-fast) var(--cup-easing-default);
            }

            :host(.cup-disabled) {
                opacity: 0.4;
                pointer-events: none;
            }

            :host(.cup-loading) {
                pointer-events: none;
            }

            :host(.cup-small) {
                min-height: 32px;
                padding: var(--cup-spacing-1) var(--cup-spacing-3);
                font-size: var(--cup-font-size-caption);
                border-radius: var(--cup-radius-sm);
            }

            :host(.cup-large) {
                min-height: 52px;
                padding: var(--cup-spacing-4) var(--cup-spacing-6);
                font-size: var(--cup-font-size-headline);
            }

            :host(.cup-full-width) {
                width: 100%;
            }

            .cup-icon {
                flex-shrink: 0;
            }

            .cup-label {
                flex: 1;
                text-align: center;
            }

            .cup-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid currentColor;
                border-top-color: transparent;
                border-radius: 50%;
                animation: cup-spin 0.6s linear infinite;
            }

            @keyframes cup-spin {
                to {
                    transform: rotate(360deg);
                }
            }

            :host(.liquid-glass) {
                backdrop-filter: blur(var(--cup-blur-light)) saturate(var(--cup-glass-saturation));
                -webkit-backdrop-filter: blur(var(--cup-blur-light)) saturate(var(--cup-glass-saturation));
                background: var(--cup-glass-bg-regular);
                border: 0.5px solid var(--cup-glass-border-light);
            }

            :host(.tinted) {
                background: var(--cup-tint-subtle);
                color: var(--cup-tint);
            }

            :host(.filled) {
                background: var(--cup-tint);
                color: var(--cup-tint-on);
            }

            :host(.plain) {
                background: transparent;
            }
        `,
    ],
})
export class CupButton {
    readonly variant = input<"liquid-glass" | "tinted" | "filled" | "plain">("filled");
    readonly size = input<"sm" | "md" | "lg">("md");
    readonly disabled = input(false);
    readonly loading = input(false);
    readonly fullWidth = input(false);
    readonly icon = input<string>();
    readonly iconPosition = input<"start" | "end">("start");
    readonly clicked = output<void>();

    protected handleClick(): void {
        if (!this.disabled() && !this.loading()) {
            this.clicked.emit();
        }
    }
}
