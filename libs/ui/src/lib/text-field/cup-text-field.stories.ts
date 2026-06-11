import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { provideCupertino } from "@ngx-cupertino/core";
import { CupTextField } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";

const meta: Meta<CupTextField> = {
    title: "Components / Text Field",
    component: CupTextField,
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
    ],
    argTypes: {
        type: {
            control: "select",
            options: ["text", "email", "password", "search", "tel", "url", "number"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        disabled: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<CupTextField>;

export const Default: Story = {
    render: () => ({
        template: `<cup-text-field placeholder="Enter text"></cup-text-field>`,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `<cup-text-field label="Email" placeholder="you@example.com"></cup-text-field>`,
    }),
};

export const WithError: Story = {
    render: () => ({
        template: `<cup-text-field label="Email" placeholder="you@example.com" error="Invalid email address"></cup-text-field>`,
    }),
};

export const WithHelper: Story = {
    render: () => ({
        template: `<cup-text-field label="Username" placeholder="Enter username" helper="Choose a unique name others will see"></cup-text-field>`,
    }),
};

export const Password: Story = {
    render: () => ({
        template: `<cup-text-field label="Password" type="password" placeholder="Enter password"></cup-text-field>`,
    }),
};

export const Search: Story = {
    render: () => ({
        template: `<cup-text-field type="search" placeholder="Search" prefixIcon="magnifyingglass"></cup-text-field>`,
    }),
};

export const Disabled: Story = {
    render: () => {
        const control = new FormControl({ value: "Disabled value", disabled: true });
        return {
            props: { control },
            template: `<cup-text-field label="Disabled" [formControl]="control"></cup-text-field>`,
            moduleMetadata: {
                imports: [ReactiveFormsModule],
            },
        };
    },
};
