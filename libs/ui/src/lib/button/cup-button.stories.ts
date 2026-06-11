import { provideCupertino } from "@ngx-cupertino/core";
import { CupButton } from "./cup-button";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";

const meta: Meta<CupButton> = {
    title: "Components / Button",
    component: CupButton,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
    ],
    argTypes: {
        variant: {
            control: "select",
            options: ["filled", "tinted", "gray", "plain", "liquid-glass"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        disabled: { control: "boolean" },
        loading: { control: "boolean" },
        destructive: { control: "boolean" },
        icon: { control: "text" },
        iconPosition: {
            control: "select",
            options: ["start", "end"],
        },
        clicked: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<CupButton>;

export const Filled: Story = {
    render: () => ({
        template: `<button cup-button variant="filled">Filled Button</button>`,
    }),
};

export const Tinted: Story = {
    render: () => ({
        template: `<button cup-button variant="tinted">Tinted Button</button>`,
    }),
};

export const Gray: Story = {
    render: () => ({
        template: `<button cup-button variant="gray">Gray Button</button>`,
    }),
};

export const Plain: Story = {
    render: () => ({
        template: `<button cup-button variant="plain">Plain Button</button>`,
    }),
};

export const LiquidGlass: Story = {
    render: () => ({
        template: `<button cup-button variant="liquid-glass">Liquid Glass Button</button>`,
    }),
};

export const Destructive: Story = {
    render: () => ({
        template: `<button cup-button variant="filled" [destructive]="true">Destructive</button>`,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `<button cup-button variant="filled" [disabled]="true">Disabled</button>`,
    }),
};

export const Loading: Story = {
    render: () => ({
        template: `<button cup-button variant="filled" [loading]="true">Loading</button>`,
    }),
};

export const Small: Story = {
    render: () => ({
        template: `<button cup-button variant="filled" size="sm">Small</button>`,
    }),
};

export const Large: Story = {
    render: () => ({
        template: `<button cup-button variant="filled" size="lg">Large</button>`,
    }),
};
