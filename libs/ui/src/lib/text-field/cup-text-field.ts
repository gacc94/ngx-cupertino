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
    styleUrl: "./cup-text-field.scss",
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
        this.inputEl()?.focus?.();
    }

    override writeValue(v: string): void {
        this.value.set(v ?? "");
    }
}
