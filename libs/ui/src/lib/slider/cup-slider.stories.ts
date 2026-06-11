import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { provideCupertino } from "@ngx-cupertino/core";
import { CupSlider } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from "@storybook/angular";

const meta: Meta<CupSlider> = {
    title: "Components / Slider",
    component: CupSlider,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
        moduleMetadata({
            imports: [CupSlider, ReactiveFormsModule],
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
type Story = StoryObj<CupSlider>;

export const Default: Story = {
    render: () => ({
        template: `<cup-slider [value]="50"></cup-slider>`,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `<cup-slider [value]="60" label="Volume" [showValue]="true"></cup-slider>`,
    }),
};

export const WithTicks: Story = {
    render: () => ({
        template: `<cup-slider [value]="50" [min]="0" [max]="100" [ticks]="5"></cup-slider>`,
    }),
};

export const WithIcons: Story = {
    render: () => ({
        template: `<cup-slider [value]="50" minIcon="magnifyingglass" maxIcon="envelope"></cup-slider>`,
    }),
};

export const Disabled: Story = {
    render: () => {
        const control = new FormControl({ value: 30, disabled: true });
        return {
            props: { control },
            template: `<cup-slider [formControl]="control"></cup-slider>`,
        };
    },
};
