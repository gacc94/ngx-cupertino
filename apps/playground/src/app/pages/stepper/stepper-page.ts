import { Component, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CupStepper } from "@ngx-cupertino/ui";

@Component({
    imports: [CupStepper, ReactiveFormsModule],
    template: `
        <div class="playground-section">
        <h2>Stepper</h2>

        <!-- ─── Basic ─── -->
        <h3>Basic</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="quantity" label="Quantity" [min]="0" [max]="99" />
            <cup-stepper [(value)]="count" label="Count" [min]="1" [max]="10" />
        </div>

        <!-- ─── Without Input (display only) ─── -->
        <h3>Without Input</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="items" label="Items" [showInput]="false" [min]="0" [max]="20" />
            <cup-stepper [(value)]="pages" label="Pages" [showInput]="false" [min]="1" [max]="50" />
        </div>

        <!-- ─── Custom Step ─── -->
        <h3>Custom Step</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="weight" label="Weight (kg)" [min]="0" [max]="200" [step]="0.5" />
            <cup-stepper [(value)]="price" label="Price ($)" [min]="0" [max]="1000" [step]="10" />
            <cup-stepper [(value)]="opacity" label="Opacity" [min]="0" [max]="1" [step]="0.1" />
        </div>

        <!-- ─── Wrap (cycles min↔max) ─── -->
        <h3>Wrap</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="month" label="Month" [min]="1" [max]="12" wrap />
            <cup-stepper [(value)]="hour" label="Hour" [min]="0" [max]="23" wrap />
            <cup-stepper [(value)]="dayOfWeek" label="Day" [min]="1" [max]="7" wrap [showInput]="false" />
        </div>

        <!-- ─── Disabled ─── -->
        <h3>Disabled</h3>
        <div class="demo-row">
            <cup-stepper [value]="5" label="Locked" disabled />
            <cup-stepper [value]="0" label="At Min" [min]="0" [max]="10" />
            <cup-stepper [value]="10" label="At Max" [min]="0" [max]="10" />
        </div>

        <!-- ─── Without Auto-repeat ─── -->
        <h3>No Auto-repeat</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="rating" label="Rating" [min]="1" [max]="5" [autoRepeat]="false" />
        </div>

        <!-- ─── Reactive Forms ─── -->
        <h3>Reactive Forms</h3>
        <form [formGroup]="stepperForm">
            <div class="demo-row">
            <cup-stepper formControlName="copies" label="Copies" [min]="1" [max]="999" />
            <cup-stepper formControlName="guests" label="Guests" [min]="1" [max]="20" />
            </div>
            <p class="demo-output">
            Form value: {{ stepperFormValue() }}
            </p>
        </form>

        <!-- ─── Edge Cases ─── -->
        <h3>Edge Cases</h3>
        <div class="demo-row">
            <cup-stepper [(value)]="largeStep" label="By 100s" [min]="0" [max]="1000" [step]="100" />
            <cup-stepper [(value)]="negative" label="Negative" [min]="-10" [max]="10" />
            <cup-stepper [(value)]="decimal" label="Decimal" [min]="0" [max]="5" [step]="0.25" />
        </div>
        </div>

        <!-- Apple way -->
        <cup-stepper  [min]="1" [max]="999" [showInput]="false" />
    `,
})
export class StepperPage {
    // Basic
    quantity = 1;
    count = 5;

    // Without Input
    items = 3;
    pages = 1;

    // Custom Step
    weight = 70;
    price = 100;
    opacity = 0.5;

    // Wrap
    month = 6;
    hour = 12;
    dayOfWeek = 1;

    // Disabled / At Min / At Max (no necesitan properties)

    // No Auto-repeat
    rating = 3;

    // Edge Cases
    largeStep = 500;
    negative = 0;
    decimal = 2.5;

    // Reactive Forms
    stepperForm = new FormGroup({
        copies: new FormControl(1),
        guests: new FormControl(2),
    });

    stepperFormValue = computed(() => JSON.stringify(this.stepperForm.value));
}
