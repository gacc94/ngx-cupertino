import { Component, signal } from "@angular/core";
import { CupToggle } from "@ngx-cupertino/ui";

@Component({
    imports: [CupToggle],
    template: `
        <h1>Toggle</h1>
        <h2>Default</h2>
        <div class="demo-row">
            <cup-toggle [(checked)]="checked" label="Wi-Fi" />
        </div>
        <h2>With Label</h2>
        <div class="demo-row">
            <cup-toggle [(checked)]="bluetooth" label="Bluetooth" />
        </div>
        <h2>Disabled</h2>
        <div class="demo-row">
            <cup-toggle [checked]="true" label="Airplane Mode" />
        </div>
    `,
})
export class TogglePage {
    readonly checked = signal(false);
    readonly bluetooth = signal(true);
}
