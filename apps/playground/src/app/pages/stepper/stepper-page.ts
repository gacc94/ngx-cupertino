import { Component, signal } from "@angular/core";
import { CupStepper } from "@ngx-cupertino/ui";

@Component({
    imports: [CupStepper],
    template: `
        <h1>Stepper</h1>
        <h2>Default</h2>
        <div class="demo-row">
            <cup-stepper [(value)]="quantity" label="Quantity" [min]="0" [max]="10" />
        </div>
        <h2>Custom Step</h2>
        <div class="demo-row">
            <cup-stepper [(value)]="weight" label="Weight (kg)" [min]="0" [max]="100" [step]="5" />
        </div>
        <h2>Without Buttons</h2>
        <div class="demo-row">
            <cup-stepper [(value)]="hidden" [showButtons]="false" />
        </div>
    `,
})
export class StepperPage {
    readonly quantity = signal(3);
    readonly weight = signal(70);
    readonly hidden = signal(0);
}
