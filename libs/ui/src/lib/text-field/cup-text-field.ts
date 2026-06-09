import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    forwardRef,
    input,
    model,
    signal,
    viewChild,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { type CupComponentSize, CupFormControl } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

type CupInputType = "text" | "email" | "password" | "search" | "tel" | "url" | "number";

let nextId = 0;

@Component({
    selector: "cup-text-field",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CupTextField),
            multi: true,
        },
    ],
    host: {
        "[class.focused]": "focused()",
        "[class.disabled]": "disabled()",
        "[class.readonly]": "readonly()",
        "[class.error]": "!!error()",
        "[class.filled]": "!!value()",
        "[class.sm]": "size() === 'sm'",
        "[class.lg]": "size() === 'lg'",
    },
    template: `
        @if (label()) {
            <label class="label" [attr.for]="inputId">{{ label() }}</label>
        }
        <div class="input-container">
            @if (prefixIcon()) {
                <cup-icon [name]="prefixIcon()!" class="prefix" size="sm" />
            }
            <input #inputRef
                   [id]="inputId"
                   [type]="type()"
                   [placeholder]="placeholder()"
                   [disabled]="disabled()"
                   [readOnly]="readonly()"
                   [value]="value()"
                   [attr.aria-label]="!label() ? ariaLabel() || placeholder() : null"
                   [attr.aria-invalid]="error() ? true : null"
                   [attr.aria-describedby]="describedBy()"
                   [attr.name]="name() || null"
                   [attr.autocomplete]="autocomplete() || null"
                   (input)="onInput($event)"
                   (focus)="onFocus()"
                   (blur)="onBlur()"
                    class="input" />
            @if (clearable() && value()) {
                <button type="button" class="clear" tabindex="-1"
                        (click)="clear()" aria-label="Clear">
                    <cup-icon name="xmark.circle.fill" size="sm" />
                </button>
            }
            @if (suffixIcon() && !(clearable() && value())) {
                <cup-icon [name]="suffixIcon()!" class="suffix" size="sm" />
            }
        </div>
        @if (error()) {
            <span class="helper error-text" [id]="inputId + '-error'">{{ error() }}</span>
        } @else if (helper()) {
            <span class="helper" [id]="inputId + '-helper'">{{ helper() }}</span>
        }
    `,
    styleUrl: "./cup-text-field.scss",
})
export class CupTextField extends CupFormControl<string> {
    override readonly value = model<string>("");

    readonly placeholder = input("");
    readonly label = input<string>();
    readonly type = input<CupInputType>("text");
    readonly size = input<CupComponentSize>("md");
    readonly readonly = input(false, { transform: booleanAttribute });
    readonly clearable = input(false, { transform: booleanAttribute });
    readonly prefixIcon = input<string>();
    readonly suffixIcon = input<string>();
    readonly error = input<string>();
    readonly helper = input<string>();
    readonly name = input<string>();
    readonly autocomplete = input<string>();
    readonly ariaLabel = input<string>();

    protected readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("inputRef");
    protected readonly focused = signal(false);
    protected readonly inputId = `cup-tf-${nextId++}`;
    protected readonly describedBy = computed(() => {
        if (this.error()) return `${this.inputId}-error`;
        if (this.helper()) return `${this.inputId}-helper`;
        return null;
    });

    protected onInput(event: Event): void {
        const el = event.target as HTMLInputElement;
        this.value.set(el.value);
        this.onChange(el.value);
    }

    protected onFocus(): void {
        this.focused.set(true);
    }

    protected onBlur(): void {
        this.focused.set(false);
        this.onTouched();
    }

    protected clear(): void {
        this.value.set("");
        this.onChange("");
        this.inputRef()?.nativeElement.focus();
    }

    override writeValue(v: string): void {
        super.writeValue(v);
        this.value.set(v ?? "");
    }
}
