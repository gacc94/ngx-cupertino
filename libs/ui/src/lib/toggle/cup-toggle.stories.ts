import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CupToggle } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { demoStyles } from "./cup-toggle.demo";

// Host components for the form-driven stories (disabled / Reactive Forms). Declared before the
// stories that reference them so the `moduleMetadata` decorators resolve them (no TDZ).
@Component({
    selector: "sb-toggle-states",
    imports: [CupToggle, ReactiveFormsModule],
    // demoStyles must live inside this component's template so its emulated-encapsulation scope
    // reaches the markup below; a <style> placed in the parent story template would not.
    template: `
        ${demoStyles}
        <div class="sb-demo">
            <section class="sb-surface">
                <div class="sb-header">
                    <h3 class="sb-title">States</h3>
                    <p class="sb-caption">Off, on, and disabled (off / on). Disabled flows through ControlValueAccessor, so it is driven by a disabled FormControl.</p>
                </div>
                <div class="sb-stack">
                    <div class="sb-row">
                        <span class="sb-rowlabel">enabled</span>
                        <cup-toggle>Off</cup-toggle>
                        <cup-toggle [checked]="true">On</cup-toggle>
                    </div>
                    <div class="sb-row">
                        <span class="sb-rowlabel">disabled</span>
                        <cup-toggle [formControl]="disabledOff">Off</cup-toggle>
                        <cup-toggle [formControl]="disabledOn">On</cup-toggle>
                    </div>
                </div>
            </section>
        </div>
    `,
})
class StatesDemo {
    readonly disabledOff = new FormControl({ value: false, disabled: true });
    readonly disabledOn = new FormControl({ value: true, disabled: true });
}

@Component({
    selector: "sb-toggle-forms",
    imports: [CupToggle, ReactiveFormsModule],
    template: `
        ${demoStyles}
        <div class="sb-demo">
            <section class="sb-surface">
                <div class="sb-header">
                    <h3 class="sb-title">Reactive Forms</h3>
                    <p class="sb-caption">Bound through [formControl]. The readout reflects the live value; flip "Control enabled" to disable the switch.</p>
                </div>
                <div class="sb-form">
                    <div class="sb-list">
                        <div class="sb-list-row">
                            <span class="sb-list-label">Notifications</span>
                            <cup-toggle [formControl]="notifications" ariaLabel="Notifications" />
                        </div>
                        <div class="sb-list-row">
                            <span class="sb-list-label">Control enabled</span>
                            <cup-toggle [checked]="true" (checkedChange)="setEnabled($event)" ariaLabel="Control enabled" />
                        </div>
                    </div>
                    <p class="sb-form-readout">value = {{ notifications.value }} · disabled = {{ notifications.disabled }}</p>
                </div>
            </section>
        </div>
    `,
})
class FormsDemo {
    readonly notifications = new FormControl(true);

    setEnabled(enabled: boolean): void {
        if (enabled) this.notifications.enable();
        else this.notifications.disable();
    }
}

type ToggleStoryArgs = {
    label: string;
    checked: boolean;
    size: "sm" | "md" | "lg";
    labelPosition: "start" | "end";
    ariaLabel?: string;
};

const meta: Meta<CupToggle & ToggleStoryArgs> = {
    title: "Components / Toggle",
    component: CupToggle,
    tags: ["autodocs"],
    decorators: [moduleMetadata({ imports: [CupToggle] })],
    parameters: { layout: "fullscreen" },
    args: {
        label: "Wi-Fi",
        checked: true,
        size: "md",
        labelPosition: "end",
        ariaLabel: undefined,
    },
    argTypes: {
        label: { control: "text" },
        checked: { control: "boolean" },
        size: { control: "select", options: ["sm", "md", "lg"] },
        labelPosition: { control: "select", options: ["start", "end"] },
        ariaLabel: { control: "text" },
        checkedChange: { action: "checkedChange" },
    },
};

export default meta;
type Story = StoryObj<CupToggle & ToggleStoryArgs>;

/** Interactive playground — flip the switch and adjust every input from the Controls panel. */
export const Playground: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div style="display:flex; justify-content:center; padding:var(--cup-space-8);">
                <cup-toggle
                    [(checked)]="checked"
                    [size]="size"
                    [labelPosition]="labelPosition"
                    [ariaLabel]="ariaLabel"
                >{{ label }}</cup-toggle>
            </div>
        `,
    }),
};

/** Off, on, and both disabled states. `disabled` flows through `ControlValueAccessor`, shown via a disabled `FormControl`. */
export const States: Story = {
    decorators: [moduleMetadata({ imports: [StatesDemo] })],
    render: () => ({ template: `<sb-toggle-states />` }),
};

/** Size scale: `sm`, `md`, `lg`, off and on. The track and thumb scale together. */
export const Sizes: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Sizes</h3>
                        <p class="sb-caption">sm, md, lg — shown off and on.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <span class="sb-rowlabel">off</span>
                            <cup-toggle size="sm" ariaLabel="Small off" />
                            <cup-toggle size="md" ariaLabel="Medium off" />
                            <cup-toggle size="lg" ariaLabel="Large off" />
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">on</span>
                            <cup-toggle size="sm" [checked]="true" ariaLabel="Small on" />
                            <cup-toggle size="md" [checked]="true" ariaLabel="Medium on" />
                            <cup-toggle size="lg" [checked]="true" ariaLabel="Large on" />
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Label placement: trailing (`end`, default) and leading (`start`). Clicking the label toggles too. */
export const LabelPlacement: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Label placement</h3>
                        <p class="sb-caption">labelPosition end (default) keeps the switch leading; start pins the label first.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <span class="sb-rowlabel">end</span>
                            <cup-toggle [checked]="true">Bluetooth</cup-toggle>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">start</span>
                            <cup-toggle [checked]="true" labelPosition="start">Bluetooth</cup-toggle>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** A bare switch with no projected label — pass an `ariaLabel` so it stays accessible. */
export const WithoutLabel: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Without label</h3>
                        <p class="sb-caption">No projected content. Always pass ariaLabel so screen readers announce the switch.</p>
                    </div>
                    <div class="sb-row">
                        <cup-toggle ariaLabel="Airplane mode" />
                        <cup-toggle [checked]="true" ariaLabel="Low power mode" />
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Realistic usage: an iOS Settings-style grouped list with the switch pinned to each row's trailing edge. */
export const SettingsList: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Settings list</h3>
                        <p class="sb-caption">A grouped list of switches — the canonical toggle context on Apple platforms.</p>
                    </div>
                    <div class="sb-list">
                        <div class="sb-list-row">
                            <span class="sb-list-label">Wi-Fi</span>
                            <cup-toggle [checked]="true" ariaLabel="Wi-Fi" />
                        </div>
                        <div class="sb-list-row">
                            <span class="sb-list-label">Bluetooth</span>
                            <cup-toggle [checked]="true" ariaLabel="Bluetooth" />
                        </div>
                        <div class="sb-list-row">
                            <span class="sb-list-label">Airplane Mode</span>
                            <cup-toggle ariaLabel="Airplane Mode" />
                        </div>
                        <div class="sb-list-row">
                            <span class="sb-list-label">Cellular Data</span>
                            <cup-toggle [checked]="true" ariaLabel="Cellular Data" />
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Two-way binding via Reactive Forms (`[formControl]`). The switch is a `ControlValueAccessor`, so it works with `formControlName` / `ngModel` and reflects `disable()`. */
export const ReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [FormsDemo] })],
    render: () => ({ template: `<sb-toggle-forms />` }),
};
