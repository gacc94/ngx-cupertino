import { ChangeDetectionStrategy, Component, input, model } from "@angular/core";
import { CupFormControl } from "@ngx-cupertino/core";

@Component({
    selector: "cup-toggle",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label class="cup-toggle-label">
            @if (label()) {
                <span class="cup-toggle-label-text">{{ label() }}</span>
            }
            <button type="button"
                    class="cup-toggle-switch"
                    role="switch"
                    [attr.aria-checked]="checked()"
                    [attr.aria-disabled]="disabled() ? true : null"
                    (click)="toggle()"
                    (keydown.space.prevent)="toggle()">
                <span class="cup-toggle-track">
                    <span class="cup-toggle-thumb"></span>
                </span>
            </button>
        </label>
    `,
    styles: [
        `
            :host {
                display: inline-flex;
            }

            .cup-toggle-label {
                display: inline-flex;
                align-items: center;
                gap: var(--cup-spacing-2);
                cursor: pointer;
                user-select: none;
            }

            .cup-toggle-label-text {
                font-size: var(--cup-font-size-body);
                color: var(--cup-label);
            }

            .cup-toggle-switch {
                position: relative;
                width: 51px;
                height: 31px;
                padding: 2px;
                border: none;
                border-radius: 31px;
                background: var(--cup-fill-quaternary);
                cursor: pointer;
                transition: background var(--cup-duration-fast) var(--cup-easing-default);
            }

            .cup-toggle-switch[aria-checked="true"] {
                background: var(--cup-tint);
            }

            .cup-toggle-switch[aria-disabled="true"] {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .cup-toggle-track {
                display: block;
                position: relative;
                width: 100%;
                height: 100%;
            }

            .cup-toggle-thumb {
                position: absolute;
                top: 0;
                left: 0;
                width: 27px;
                height: 27px;
                border-radius: 50%;
                background: var(--cup-bg-primary);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
                transition: transform var(--cup-duration-fast) var(--cup-easing-spring);
            }

            .cup-toggle-switch[aria-checked="true"] .cup-toggle-thumb {
                transform: translateX(20px);
            }
        `,
    ],
})
export class CupToggle extends CupFormControl<boolean> {
    readonly checked = model<boolean>(false);
    readonly label = input<string>();

    toggle(): void {
        if (this.disabled()) return;
        const next = !this.checked();
        this.checked.set(next);
        this.onChange(next);
    }

    override writeValue(v: boolean): void {
        this.checked.set(v);
    }
}
