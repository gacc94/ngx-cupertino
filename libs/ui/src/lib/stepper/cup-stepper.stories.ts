import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { provideCupertino } from "@ngx-cupertino/core";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";
import { CupStepper } from "./cup-stepper";

const meta: Meta<CupStepper> = {
    title: "Components / Stepper",
    component: CupStepper,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
    ],
    argTypes: {
        min: { control: "number" },
        max: { control: "number" },
        step: { control: "number" },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<CupStepper>;

export const Default: Story = {
    render: () => ({
        template: `<cup-stepper [value]="5"></cup-stepper>`,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `<cup-stepper [value]="5" label="Quantity"></cup-stepper>`,
    }),
};

export const MinMax: Story = {
    render: () => ({
        template: `<cup-stepper [value]="5" [min]="0" [max]="10" label="Quantity"></cup-stepper>`,
    }),
};

export const Wrap: Story = {
    render: () => ({
        template: `<cup-stepper [value]="5" [min]="0" [max]="9" [wrap]="true" label="Wrap"></cup-stepper>`,
    }),
};

export const Disabled: Story = {
    render: () => {
        const control = new FormControl({ value: 5, disabled: true });
        return {
            props: { control },
            template: `<cup-stepper [formControl]="control" label="Disabled"></cup-stepper>`,
            moduleMetadata: {
                imports: [ReactiveFormsModule],
            },
        };
    },
};
