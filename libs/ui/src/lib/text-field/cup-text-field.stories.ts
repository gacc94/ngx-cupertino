import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupTextField } from "./cup-text-field";

const meta: Meta<CupTextField> = {
    component: CupTextField,
    title: "CupTextField",
};
export default meta;

type Story = StoryObj<CupTextField>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-text-field/gi)).toBeTruthy();
    },
};
