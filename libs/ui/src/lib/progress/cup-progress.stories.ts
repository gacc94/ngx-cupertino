import { provideCupertino } from "@ngx-cupertino/core";
import { CupProgress } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";

const meta: Meta<CupProgress> = {
    title: "Components / Progress",
    component: CupProgress,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
    ],
    argTypes: {
        type: {
            control: "select",
            options: ["linear", "circular", "spinner"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        value: { control: "number" },
        max: { control: "number" },
        indeterminate: { control: "boolean" },
        showPercentage: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<CupProgress>;

export const Linear: Story = {
    render: () => ({
        template: `<cup-progress type="linear" [value]="60" [showPercentage]="true"></cup-progress>`,
    }),
};

export const LinearIndeterminate: Story = {
    render: () => ({
        template: `<cup-progress type="linear" [indeterminate]="true" label="Loading..."></cup-progress>`,
    }),
};

export const Circular: Story = {
    render: () => ({
        template: `<cup-progress type="circular" [value]="75" label="75% complete"></cup-progress>`,
    }),
};

export const Spinner: Story = {
    render: () => ({
        template: `<cup-progress type="spinner"></cup-progress>`,
    }),
};

export const Sizes: Story = {
    render: () => ({
        template: `
            <div style="display: flex; gap: 24px; align-items: center;">
                <cup-progress type="spinner" size="sm"></cup-progress>
                <cup-progress type="spinner"></cup-progress>
                <cup-progress type="spinner" size="lg"></cup-progress>
            </div>
        `,
    }),
};
