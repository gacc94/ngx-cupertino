import { Component, signal } from "@angular/core";
import { CupTextField } from "@ngx-cupertino/ui";

@Component({
    imports: [CupTextField],
    template: `
        <h1>Text Field</h1>
        <h2>Default</h2>
        <div style="width: 300px">
            <cup-text-field [(value)]="name" label="Name" placeholder="Enter your name" />
        </div>
        <h2>With Clear Button</h2>
        <div style="width: 300px">
            <cup-text-field [(value)]="search" placeholder="Search..." [clearable]="true" />
        </div>
        <h2>With Prefix Icon</h2>
        <div style="width: 300px">
            <cup-text-field [(value)]="email" label="Email" type="email" prefixIcon="envelope" placeholder="you@example.com" />
        </div>
    `,
})
export class TextFieldPage {
    readonly name = signal("");
    readonly search = signal("");
    readonly email = signal("");
}
