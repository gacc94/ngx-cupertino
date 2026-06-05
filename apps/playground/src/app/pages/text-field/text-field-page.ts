import { Component, signal } from "@angular/core";
import { CupTextField } from "@ngx-cupertino/ui";

@Component({
    imports: [CupTextField],
    template: `
        <h1>Text Field</h1>
        <div class="demo-section">
            <h2>Default</h2>
            <div style="width: 320px">
                <cup-text-field [(value)]="name" label="Name" placeholder="Enter your name" />
            </div>
        </div>
        <div class="demo-section">
            <h2>Clearable</h2>
            <div style="width: 320px">
                <cup-text-field [(value)]="search" placeholder="Search..." [clearable]="true" />
            </div>
        </div>
        <div class="demo-section">
            <h2>With Icon</h2>
            <div style="width: 320px">
                <cup-text-field [(value)]="email" label="Email" type="email" prefixIcon="envelope" placeholder="you@example.com" />
            </div>
        </div>
    `,
})
export class TextFieldPage {
    readonly name = signal("");
    readonly search = signal("");
    readonly email = signal("");
}
