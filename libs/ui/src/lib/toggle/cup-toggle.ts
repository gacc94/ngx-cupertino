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
    styleUrl: "./cup-toggle.scss",
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
