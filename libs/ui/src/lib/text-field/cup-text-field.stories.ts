import { FormControl, ReactiveFormsModule } from "@angular/forms";
import type { Meta, StoryObj } from "@storybook/angular";
import { CupTextField } from "./cup-text-field";

const meta: Meta<CupTextField> = {
    component: CupTextField,
    title: "Components/TextField",
    argTypes: {
        type: { control: "select", options: ["text", "email", "password", "search", "tel", "url", "number"] },
    },
};
export default meta;

type Story = StoryObj<CupTextField>;

export const Default: Story = {
    args: { label: "Name", type: "text" },
    render: (args) => ({
        props: args,
        template: `<cup-text-field [label]="label" [type]="type"></cup-text-field>`,
    }),
};

export const WithLabel: Story = {
    args: { label: "Email", placeholder: "you@example.com", type: "email" },
    render: (args) => ({
        props: args,
        template: `<cup-text-field [label]="label" [placeholder]="placeholder" [type]="type"></cup-text-field>`,
    }),
};

export const WithError: Story = {
    args: { label: "Username", error: "Username is already taken", type: "text" },
    render: (args) => ({
        props: args,
        template: `<cup-text-field [label]="label" [error]="error" [type]="type"></cup-text-field>`,
    }),
};

export const WithHelper: Story = {
    args: { label: "Password", helper: "Must be at least 8 characters", type: "text" },
    render: (args) => ({
        props: args,
        template: `<cup-text-field [label]="label" [helper]="helper" [type]="type"></cup-text-field>`,
    }),
};

export const Password: Story = {
    args: { label: "Password", type: "password", placeholder: "Enter password" },
    render: (args) => ({
        props: args,
        template: `<cup-text-field [label]="label" [type]="type" [placeholder]="placeholder"></cup-text-field>`,
    }),
};

export const Disabled: Story = {
    render: () => ({
        moduleMetadata: { imports: [ReactiveFormsModule] },
        template: `<cup-text-field [formControl]="ctrl" label="Name" placeholder="Disabled field"></cup-text-field>`,
        props: { ctrl: new FormControl({ value: "", disabled: true }) },
    }),
};
