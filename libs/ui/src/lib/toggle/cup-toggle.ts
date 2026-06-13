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
        "[class.checked]": "checked()",
        "[class.disabled]": "disabled()",
        "[class.sm]": "size() === 'sm'",
        "[class.lg]": "size() === 'lg'",
        "[class.label-start]": "labelPosition() === 'start'",
    },
    template: `
        <button type="button"
                class="track"
                role="switch"
                [attr.aria-checked]="checked()"
                [attr.aria-disabled]="disabled() ? true : null"
                [attr.aria-label]="ariaLabel() || null"
                [disabled]="disabled()"
                (click)="toggle()"
                (keydown)="onKeydown($event)">
            <span class="thumb"></span>
        </button>
        <span class="label" (click)="toggle()"><ng-content /></span>
    `,
    styleUrl: "./cup-toggle.scss",
})
export class CupToggle extends CupFormControl<boolean> {
    readonly checked = model(false);
    readonly size = input<CupComponentSize>("md");
    readonly labelPosition = input<"start" | "end">("end");
    readonly ariaLabel = input<string>();

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

    protected onKeydown(event: KeyboardEvent): void {
        if (event.key !== " ") return;

        event.preventDefault();
        this.toggle();
    }
}
