import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupToggle } from "./cup-toggle";

const meta: Meta<CupToggle> = {
    component: CupToggle,
    title: "CupToggle",
};
export default meta;

type Story = StoryObj<CupToggle>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-toggle/gi)).toBeTruthy();
    },
};
