import { FormControl, ReactiveFormsModule } from "@angular/forms";
import type { Meta, StoryObj } from "@storybook/angular";
import { CupToggle } from "./cup-toggle";

const meta: Meta<CupToggle> = {
    component: CupToggle,
    title: "Components/Toggle",
    argTypes: {
        checked: { control: "boolean" },
        size: { control: "select", options: ["sm", "md", "lg"] },
        labelPosition: { control: "select", options: ["start", "end"] },
    },
    args: {
        checked: false,
        size: "md",
        labelPosition: "end",
    },
};
export default meta;

type Story = StoryObj<CupToggle>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `<cup-toggle [checked]="checked" [size]="size" [labelPosition]="labelPosition">Wi-Fi</cup-toggle>`,
    }),
};

export const Checked: Story = {
    args: { checked: true },
    render: (args) => ({
        props: args,
        template: `<cup-toggle [checked]="checked" [size]="size">On</cup-toggle>`,
    }),
};

export const Small: Story = {
    args: { size: "sm" },
    render: (args) => ({
        props: args,
        template: `<cup-toggle [checked]="checked" [size]="size">Small</cup-toggle>`,
    }),
};

export const Large: Story = {
    args: { size: "lg" },
    render: (args) => ({
        props: args,
        template: `<cup-toggle [checked]="checked" [size]="size">Large</cup-toggle>`,
    }),
};

export const LabelStart: Story = {
    args: { labelPosition: "start" },
    render: (args) => ({
        props: args,
        template: `<cup-toggle [checked]="checked" [size]="size" [labelPosition]="labelPosition">Label Start</cup-toggle>`,
    }),
};

export const Disabled: Story = {
    render: () => ({
        moduleMetadata: { imports: [ReactiveFormsModule] },
        template: `<cup-toggle [formControl]="ctrl">Disabled</cup-toggle>`,
        props: {
            ctrl: new FormControl({ value: false, disabled: true }),
        },
    }),
};
