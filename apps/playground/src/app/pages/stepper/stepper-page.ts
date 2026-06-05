import { Component, signal } from "@angular/core";
import { CupStepper } from "@ngx-cupertino/ui";

@Component({
    imports: [CupStepper],
    template: `
        <h1>Stepper</h1>
        <div class="demo-section">
            <h2>Default</h2>
            <div class="demo-row">
                <cup-stepper [(value)]="quantity" label="Quantity" [min]="0" [max]="10" />
            </div>
        </div>
        <div class="demo-section">
            <h2>Custom Step</h2>
            <div class="demo-row">
                <cup-stepper [(value)]="weight" label="Weight (kg)" [min]="0" [max]="100" [step]="5" />
            </div>
        </div>
        <div class="demo-section">
            <h2>Without Buttons</h2>
            <div class="demo-row">
                <cup-stepper [(value)]="hidden" [showButtons]="false" />
            </div>
        </div>
    `,
})
export class StepperPage {
    readonly quantity = signal(3);
    readonly weight = signal(70);
    readonly hidden = signal(0);
}
