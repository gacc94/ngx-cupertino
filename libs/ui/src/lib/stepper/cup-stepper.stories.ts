import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { provideCupertino } from "@ngx-cupertino/core";
import { CupStepper } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from "@storybook/angular";

const meta: Meta<CupStepper> = {
    title: "Components / Stepper",
    component: CupStepper,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
        moduleMetadata({
            imports: [CupStepper, ReactiveFormsModule],
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
        };
    },
};
