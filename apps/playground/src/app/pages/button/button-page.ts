import { Component } from "@angular/core";
import { CupButton } from "@ngx-cupertino/ui";

@Component({
    imports: [CupButton],
    template: `
        <h1>Button</h1>
        <h2>Variants</h2>
        <div class="demo-row">
            <button cup-button variant="filled">Filled</button>
            <button cup-button variant="tinted">Tinted</button>
            <button cup-button variant="liquid-glass">Liquid Glass</button>
            <button cup-button variant="plain">Plain</button>
        </div>
        <h2>Sizes</h2>
        <div class="demo-row">
            <button cup-button size="sm">Small</button>
            <button cup-button size="md">Medium</button>
            <button cup-button size="lg">Large</button>
        </div>
        <h2>States</h2>
        <div class="demo-row">
            <button cup-button [disabled]="true">Disabled</button>
            <button cup-button [loading]="true">Loading</button>
        </div>
        <h2>With Icon</h2>
        <div class="demo-row">
            <button cup-button icon="star">Star</button>
            <button cup-button icon="heart" iconPosition="end">Like</button>
        </div>
    `,
})
export class ButtonPage {}
