import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CupButton } from "@ngx-cupertino/ui";

@Component({
    imports: [RouterModule, CupButton],
    template: `
        <h1>Home</h1>
        <p>Angular component library implementing the Apple Design System for web.</p>
        <h2>Phase 1 Components</h2>
        <div class="demo-row">
            <button cup-button variant="tinted" routerLink="/button">Button</button>
            <button cup-button variant="tinted" routerLink="/toggle">Toggle</button>
            <button cup-button variant="tinted" routerLink="/text-field">Text Field</button>
            <button cup-button variant="tinted" routerLink="/slider">Slider</button>
            <button cup-button variant="tinted" routerLink="/stepper">Stepper</button>
            <button cup-button variant="tinted" routerLink="/progress">Progress</button>
        </div>
    `,
})
export class HomePage {}
