import type { Meta, StoryObj } from "@storybook/angular";
import { CupProgress } from "./cup-progress";

const meta: Meta<CupProgress> = {
    component: CupProgress,
    title: "Components/Progress",
    argTypes: {
        value: { control: "number" },
        max: { control: "number" },
        type: { control: "select", options: ["linear", "circular", "spinner"] },
        size: { control: "select", options: ["sm", "md", "lg"] },
        indeterminate: { control: "boolean" },
        label: { control: "text" },
        showPercentage: { control: "boolean" },
    },
    args: {
        value: 50,
        max: 100,
        type: "linear",
        size: "md",
        indeterminate: false,
        showPercentage: false,
    },
};
export default meta;

type Story = StoryObj<CupProgress>;

export const Linear: Story = {
    render: (args) => ({
        props: args,
        template: `<cup-progress [value]="value" [max]="max" [label]="label" showPercentage></cup-progress>`,
    }),
};

export const LinearIndeterminate: Story = {
    args: {
        indeterminate: true,
        type: "circular",
    },
    render: (args) => ({
        props: args,
        template: `<cup-progress [indeterminate]="indeterminate" [label]="label"></cup-progress>`,
    }),
};

export const Circular: Story = {
    args: { type: "circular" },
    render: (args) => ({
        props: args,
        template: `<cup-progress type="circular" [value]="value"></cup-progress>`,
    }),
};

export const Spinner: Story = {
    args: { type: "spinner" },
    render: (args) => ({
        props: args,
        template: `<cup-progress type="spinner"></cup-progress>`,
    }),
};
