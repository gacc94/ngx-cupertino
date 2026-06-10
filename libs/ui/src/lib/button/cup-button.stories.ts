import type { Meta, StoryObj } from "@storybook/angular";
import { CupButton } from "./cup-button";

const meta: Meta<CupButton> = {
    component: CupButton,
    title: "Components/Button",
    argTypes: {
        variant: {
            control: "select",
            options: ["filled", "tinted", "gray", "plain", "liquid-glass"],
        },
        size: { control: "select", options: ["sm", "md", "lg"] },
        disabled: { control: "boolean" },
        destructive: { control: "boolean" },
        loading: { control: "boolean" },
    },
    args: {
        variant: "filled",
        size: "md",
        disabled: false,
        destructive: false,
        loading: false,
    },
};
export default meta;

type Story = StoryObj<CupButton>;

export const Filled: Story = {
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size" [disabled]="disabled" [destructive]="destructive" [loading]="loading">Click me</button>`,
    }),
};

export const Tinted: Story = {
    args: { variant: "tinted" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size" [disabled]="disabled">Tinted</button>`,
    }),
};

export const Gray: Story = {
    args: { variant: "gray" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size">Gray</button>`,
    }),
};

export const Plain: Story = {
    args: { variant: "plain" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant">Plain</button>`,
    }),
};

export const LiquidGlass: Story = {
    args: { variant: "liquid-glass" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant">Glass</button>`,
    }),
};

export const Destructive: Story = {
    args: { variant: "filled", destructive: true },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [destructive]="destructive">Delete</button>`,
    }),
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [disabled]="disabled">Disabled</button>`,
    }),
};

export const Loading: Story = {
    args: { loading: true },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [loading]="loading">Loading</button>`,
    }),
};

export const Small: Story = {
    args: { size: "sm" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size">Small</button>`,
    }),
};

export const Large: Story = {
    args: { size: "lg" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size">Large</button>`,
    }),
};
