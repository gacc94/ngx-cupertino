import { FormControl, ReactiveFormsModule } from "@angular/forms";
import type { Meta, StoryObj } from "@storybook/angular";
import { CupStepper } from "./cup-stepper";

const meta: Meta<CupStepper> = {
    component: CupStepper,
    title: "Components/Stepper",
    argTypes: {
        value: { control: "number" },
        min: { control: "number" },
        max: { control: "number" },
        step: { control: "number" },
        label: { control: "text" },
        wrap: { control: "boolean" },
    },
    args: {
        value: 0,
        min: 0,
        max: 100,
        step: 1,
        wrap: false,
    },
};
export default meta;

type Story = StoryObj<CupStepper>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `<cup-stepper [value]="value" [min]="min" [max]="max" [step]="step" [label]="label" [wrap]="wrap"></cup-stepper>`,
    }),
};

export const WithLabel: Story = {
    args: { label: "Quantity" },
    render: (args) => ({
        props: args,
        template: `<cup-stepper [value]="value" [min]="min" [max]="max" [step]="step" [label]="label" [wrap]="wrap"></cup-stepper>`,
    }),
};

export const Disabled: Story = {
    render: () => ({
        moduleMetadata: { imports: [ReactiveFormsModule] },
        template: `<cup-stepper [formControl]="ctrl" label="Quantity"></cup-stepper>`,
        props: { ctrl: new FormControl({ value: 5, disabled: true }) },
    }),
};

export const Wrap: Story = {
    args: { wrap: true },
    render: (args) => ({
        props: args,
        template: `<cup-stepper [value]="value" [min]="min" [max]="max" [step]="step" [label]="label" [wrap]="wrap"></cup-stepper>`,
    }),
};
