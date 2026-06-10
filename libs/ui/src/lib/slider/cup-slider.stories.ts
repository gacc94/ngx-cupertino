import { FormControl, ReactiveFormsModule } from "@angular/forms";
import type { Meta, StoryObj } from "@storybook/angular";
import { CupSlider } from "./cup-slider";

const meta: Meta<CupSlider> = {
    component: CupSlider,
    title: "Components/Slider",
    argTypes: {
        min: { control: "number" },
        max: { control: "number" },
        step: { control: "number" },
        label: { control: "text" },
        showValue: { control: "boolean" },
    },
    args: {
        value: 50,
        min: 0,
        max: 100,
        step: 1,
        showValue: true,
    },
};
export default meta;

type Story = StoryObj<CupSlider>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `<cup-slider [value]="value" [min]="min" [max]="max" [step]="step" [showValue]="showValue"></cup-slider>`,
    }),
};

export const WithLabel: Story = {
    args: { label: "Volume", value: 30 },
    render: (args) => ({
        props: args,
        template: `<cup-slider [value]="value" [min]="min" [max]="max" [step]="step" [label]="label" [showValue]="showValue"></cup-slider>`,
    }),
};

export const WithTicks: Story = {
    args: { value: 25, ticks: 5, step: 25 },
    render: (args) => ({
        props: args,
        template: `<cup-slider [value]="value" [min]="min" [max]="max" [step]="step" [ticks]="ticks"></cup-slider>`,
    }),
};

export const WithIcons: Story = {
    args: { value: 70, minIcon: "magnifyingglass", maxIcon: "envelope" },
    render: (args) => ({
        props: args,
        template: `<cup-slider [value]="value" [minIcon]="minIcon" [maxIcon]="maxIcon"></cup-slider>`,
    }),
};

export const Disabled: Story = {
    render: () => ({
        moduleMetadata: { imports: [ReactiveFormsModule] },
        template: `<cup-slider [formControl]="ctrl" label="Brightness" showValue></cup-slider>`,
        props: {
            ctrl: new FormControl({ value: 60, disabled: true }),
        },
    }),
};
