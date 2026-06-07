import { JsonPipe } from "@angular/common";
import { Component, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CupTextField } from "@ngx-cupertino/ui";

@Component({
    imports: [CupTextField, ReactiveFormsModule, JsonPipe],
    template: `
        <div class="playground-section">
            <h2>Text Field</h2>

            <!-- ─── Basic ─── -->
            <h3>Basic</h3>
            <div class="demo-column">
                <cup-text-field
                    [(value)]="username"
                    label="Username"
                    placeholder="Enter your username" />
                <cup-text-field
                    [(value)]="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    prefixIcon="envelope" />
                <cup-text-field
                    [(value)]="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••" />
            </div>

            <!-- ─── Search with Clear ─── -->
            <h3>Search</h3>
            <div class="demo-column">
                <cup-text-field
                    [(value)]="searchQuery"
                    type="search"
                    placeholder="Search..."
                    prefixIcon="magnifyingglass"
                    clearable />
            </div>

            <!-- ─── Sizes ─── -->
            <h3>Sizes</h3>
            <div class="demo-column">
                <cup-text-field size="sm" placeholder="Small input" label="Small" />
                <cup-text-field placeholder="Medium input (default)" label="Medium" />
                <cup-text-field size="lg" placeholder="Large input" label="Large" />
            </div>

            <!-- ─── Prefix & Suffix Icons ─── -->
            <h3>Prefix & Suffix Icons</h3>
            <div class="demo-column">
                <cup-text-field
                    label="Website"
                    placeholder="https://..."
                    prefixIcon="link"
                    suffixIcon="arrow.right" />
                <cup-text-field
                    label="Phone"
                    placeholder="+1 (555) 000-0000"
                    prefixIcon="phone"
                    type="tel" />
                <cup-text-field
                    label="Location"
                    placeholder="City or ZIP code"
                    prefixIcon="location"
                    suffixIcon="magnifyingglass" />
            </div>

            <!-- ─── Helper Text ─── -->
            <h3>Helper Text</h3>
            <div class="demo-column">
                <cup-text-field
                    [(value)]="bio"
                    label="Bio"
                    placeholder="Tell us about yourself"
                    helper="Max 160 characters" />
                <cup-text-field
                    label="Username"
                    placeholder="Choose a username"
                    helper="Only letters, numbers, and underscores" />
            </div>

            <!-- ─── Error State ─── -->
            <h3>Error State</h3>
            <div class="demo-column">
                <cup-text-field
                    value="notanemail"
                    label="Email"
                    type="email"
                    error="Invalid email address" />
                <cup-text-field
                    value=""
                    label="Required Field"
                    error="This field is required" />
                <cup-text-field
                    value="ab"
                    label="Username"
                    error="Must be at least 3 characters"
                    helper="This helper is hidden by error" />
            </div>

            <!-- ─── Disabled ─── -->
            <h3>Disabled</h3>
            <div class="demo-column">
                <cup-text-field
                    value="Cannot edit this"
                    label="Locked Field"
                    disabled />
                <cup-text-field
                    label="Disabled Empty"
                    placeholder="No input allowed"
                    disabled />
            </div>

            <!-- ─── Readonly ─── -->
            <h3>Readonly</h3>
            <div class="demo-column">
                <cup-text-field
                    value="sk_live_abc123xyz789"
                    label="API Key"
                    readonly />
                <cup-text-field
                    value="user@company.com"
                    label="Account Email"
                    readonly
                    prefixIcon="envelope" />
            </div>

            <!-- ─── Reactive Forms ─── -->
            <h3>Reactive Forms</h3>
            <form [formGroup]="textFieldForm">
                <div class="demo-column">
                    <cup-text-field
                        formControlName="name"
                        label="Full Name"
                        placeholder="John Doe"
                        prefixIcon="person.circle"
                        [error]="nameError()" />
                    <cup-text-field
                        formControlName="email"
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        prefixIcon="envelope"
                        autocomplete="email"
                        [error]="formEmailError()" />
                    <cup-text-field
                        formControlName="website"
                        label="Website"
                        type="url"
                        placeholder="https://..."
                        prefixIcon="link" />
                </div>
                <p class="demo-output">
                    Form value: {{ textFieldForm.value | json }}
                </p>
                <p class="demo-output">
                    Valid: {{ textFieldForm.valid }}
                </p>
            </form>

            <!-- ─── All Types ─── -->
            <h3>Input Types</h3>
            <div class="demo-column">
                <cup-text-field type="text" label="Text" placeholder="Plain text" />
                <cup-text-field type="email" label="Email" placeholder="email@example.com" />
                <cup-text-field type="password" label="Password" placeholder="••••••••" />
                <cup-text-field type="search" label="Search" placeholder="Search..." clearable />
                <cup-text-field type="tel" label="Telephone" placeholder="+1 555-0000" />
                <cup-text-field type="url" label="URL" placeholder="https://..." />
                <cup-text-field type="number" label="Number" placeholder="0" />
            </div>

            <!-- ─── Size × State Matrix ─── -->
            <h3>Size × State Matrix</h3>
            <table class="demo-matrix">
                <thead>
                    <tr>
                        <th></th>
                        <th>Default</th>
                        <th>With Value</th>
                        <th>Error</th>
                        <th>Disabled</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SM</td>
                        <td><cup-text-field size="sm" placeholder="Empty" /></td>
                        <td><cup-text-field size="sm" value="Value" /></td>
                        <td><cup-text-field size="sm" value="Bad" error="Error" /></td>
                        <td><cup-text-field size="sm" value="Locked" disabled /></td>
                    </tr>
                    <tr>
                        <td>MD</td>
                        <td><cup-text-field placeholder="Empty" /></td>
                        <td><cup-text-field value="Value" /></td>
                        <td><cup-text-field value="Bad" error="Error" /></td>
                        <td><cup-text-field value="Locked" disabled /></td>
                    </tr>
                    <tr>
                        <td>LG</td>
                        <td><cup-text-field size="lg" placeholder="Empty" /></td>
                        <td><cup-text-field size="lg" value="Value" /></td>
                        <td><cup-text-field size="lg" value="Bad" error="Error" /></td>
                        <td><cup-text-field size="lg" value="Locked" disabled /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
})
export class TextFieldPage {
    // Properties
    username = "";
    email = "";
    password = "";
    searchQuery = "";
    bio = "";

    // Reactive Form
    textFieldForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(2)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        website: new FormControl(""),
    });

    nameError = computed(() => {
        const ctrl = this.textFieldForm.controls.name;
        if (!ctrl.touched || !ctrl.errors) return undefined;
        if (ctrl.errors["required"]) return "Name is required";
        if (ctrl.errors["minlength"]) return "Must be at least 2 characters";
        return undefined;
    });

    formEmailError = computed(() => {
        const ctrl = this.textFieldForm.controls.email;
        if (!ctrl.touched || !ctrl.errors) return undefined;
        if (ctrl.errors["required"]) return "Email is required";
        if (ctrl.errors["email"]) return "Invalid email format";
        return undefined;
    });
}
