import { ChangeDetectionStrategy, Component, input, model, viewChild } from "@angular/core";
import { CupFormControl } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

@Component({
    selector: "cup-text-field",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    template: `
        <div class="cup-text-field-wrapper">
            @if (label()) {
                <label class="cup-text-field-label">{{ label() }}</label>
            }
            <div class="cup-text-field-input-container">
                @if (prefixIcon()) {
                    <cup-icon [name]="prefixIcon()!" class="cup-text-field-prefix" />
                }
                <input #inputEl
                       [type]="type()"
                       [placeholder]="placeholder()"
                       [disabled]="disabled()"
                       [readonly]="readonly()"
                       [value]="value()"
                       [attr.aria-label]="label() || placeholder() || null"
                       [attr.aria-invalid]="null"
                       (input)="onInput($event)"
                       (blur)="onTouched()"
                       class="cup-text-field-input" />
                @if (clearable() && value()) {
                    <button type="button"
                            class="cup-text-field-clear"
                            (click)="clear()"
                            aria-label="Clear input">
                        <cup-icon name="xmark" />
                    </button>
                }
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }

            .cup-text-field-wrapper {
                display: flex;
                flex-direction: column;
                gap: var(--cup-spacing-1);
            }

            .cup-text-field-label {
                font-size: var(--cup-font-size-caption);
                font-weight: var(--cup-font-weight-medium);
                color: var(--cup-label);
            }

            .cup-text-field-input-container {
                display: flex;
                align-items: center;
                gap: var(--cup-spacing-2);
                padding: var(--cup-spacing-2) var(--cup-spacing-3);
                background: var(--cup-fill-secondary);
                border-radius: var(--cup-radius-md);
                border: 1px solid var(--cup-separator);
                transition: border-color var(--cup-duration-fast) var(--cup-easing-default);
            }

            .cup-text-field-input-container:focus-within {
                border-color: var(--cup-tint);
            }

            .cup-text-field-prefix {
                flex-shrink: 0;
                color: var(--cup-label-secondary);
            }

            .cup-text-field-input {
                flex: 1;
                border: none;
                background: none;
                outline: none;
                font-family: var(--cup-font-family);
                font-size: var(--cup-font-size-body);
                color: var(--cup-label);
            }

            .cup-text-field-input::placeholder {
                color: var(--cup-label-secondary);
            }

            .cup-text-field-input:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .cup-text-field-clear {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                border: none;
                background: none;
                color: var(--cup-label-secondary);
                cursor: pointer;
            }

            .cup-text-field-clear:hover {
                color: var(--cup-label);
            }
        `,
    ],
})
export class CupTextField extends CupFormControl<string> {
    override readonly value = model<string>("");
    readonly placeholder = input("");
    readonly label = input<string>();
    readonly type = input("text");
    readonly readonly = input(false);
    readonly clearable = input(false);
    readonly prefixIcon = input<string>();
    readonly inputEl = viewChild<HTMLInputElement>("inputEl");

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.value.set(input.value);
        this.onChange(input.value);
    }

    clear(): void {
        this.value.set("");
        this.onChange("");
        this.inputEl()?.focus();
    }

    override writeValue(v: string): void {
        this.value.set(v ?? "");
    }
}
