import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { provideCupertino } from "@ngx-cupertino/core";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";
import { CupToggle } from "./cup-toggle";

const meta: Meta<CupToggle> = {
    title: "Components / Toggle",
    component: CupToggle,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
    ],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        labelPosition: {
            control: "select",
            options: ["start", "end"],
        },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<CupToggle>;

export const Default: Story = {
    render: () => ({
        template: `<cup-toggle>Wi-Fi</cup-toggle>`,
    }),
};

export const Checked: Story = {
    render: () => ({
        template: `<cup-toggle [checked]="true">Bluetooth</cup-toggle>`,
    }),
};

export const Small: Story = {
    render: () => ({
        template: `<cup-toggle size="sm">Small Toggle</cup-toggle>`,
    }),
};

export const Large: Story = {
    render: () => ({
        template: `<cup-toggle size="lg">Large Toggle</cup-toggle>`,
    }),
};

export const LabelStart: Story = {
    render: () => ({
        template: `<cup-toggle labelPosition="start">Label Start</cup-toggle>`,
    }),
};

export const Disabled: Story = {
    render: () => {
        const control = new FormControl({ value: true, disabled: true });
        return {
            props: { control },
            template: `<cup-toggle [formControl]="control">Disabled</cup-toggle>`,
            moduleMetadata: {
                imports: [ReactiveFormsModule],
            },
        };
    },
};
