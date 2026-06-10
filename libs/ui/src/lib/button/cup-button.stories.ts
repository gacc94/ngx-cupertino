import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupButton } from "./cup-button";

const meta: Meta<CupButton> = {
    component: CupButton,
    title: "CupButton",
};
export default meta;

type Story = StoryObj<CupButton>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-button/gi)).toBeTruthy();
    },
};
