import { ChangeDetectionStrategy, Component, forwardRef, input, model } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { type CupComponentSize, CupFormControl } from "@ngx-cupertino/core";

@Component({
    selector: "cup-toggle",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CupToggle),
            multi: true,
        },
    ],
    host: {
        "[class.cup-checked]": "checked()",
        "[class.cup-disabled]": "disabled()",
        "[class.cup-small]": "size() === 'sm'",
        "[class.cup-large]": "size() === 'lg'",
    },
    template: `
        @if (labelPosition() === 'start') {
            <span class="cup-label" (click)="toggle()"><ng-content /></span>
        }
        <button type="button" class="cup-track" role="switch"
                [attr.aria-checked]="checked()"
                [attr.aria-disabled]="disabled() ? true : null"
                [attr.aria-label]="ariaLabel() || null"
                [attr.aria-describedby]="ariaDescribedBy() || null"
                [attr.name]="name() || null"
                [disabled]="disabled()"
                (click)="toggle()"
                (keydown.space.prevent)="toggle()">
            <span class="cup-thumb"></span>
        </button>
        @if (labelPosition() === 'end') {
            <span class="cup-label" (click)="toggle()"><ng-content /></span>
        }
    `,
    styleUrl: "./cup-toggle.scss",
})
export class CupToggle extends CupFormControl<boolean> {
    readonly checked = model(false);
    readonly size = input<CupComponentSize>("md");
    readonly labelPosition = input<"start" | "end">("end");
    readonly ariaLabel = input<string>();
    readonly ariaDescribedBy = input<string>();
    readonly name = input<string>();

    override writeValue(v: boolean): void {
        super.writeValue(v);
        this.checked.set(!!v);
    }

    protected toggle(): void {
        if (this.disabled()) return;
        this.checked.update((v) => !v);
        this.onChange(this.checked());
        this.onTouched();
    }
}
