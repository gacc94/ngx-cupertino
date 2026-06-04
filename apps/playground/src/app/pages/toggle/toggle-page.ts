import { Component, signal } from "@angular/core";
import { CupToggle } from "@ngx-cupertino/ui";

@Component({
    imports: [CupToggle],
    template: `
        <h1>Toggle</h1>
        <div class="demo-section">
            <h2>Default</h2>
            <div class="demo-row">
                <cup-toggle [(checked)]="checked" label="Wi-Fi" />
            </div>
        </div>
        <div class="demo-section">
            <h2>With Label</h2>
            <div class="demo-row">
                <cup-toggle [(checked)]="bluetooth" label="Bluetooth" />
            </div>
        </div>
        <div class="demo-section">
            <h2>Pre-checked</h2>
            <div class="demo-row">
                <cup-toggle [checked]="true" label="Airplane Mode" />
            </div>
        </div>
    `,
})
export class TogglePage {
    readonly checked = signal(false);
    readonly bluetooth = signal(true);
}
