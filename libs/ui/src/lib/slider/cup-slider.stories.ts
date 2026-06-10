import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupSlider } from "./cup-slider";

const meta: Meta<CupSlider> = {
    component: CupSlider,
    title: "CupSlider",
};
export default meta;

type Story = StoryObj<CupSlider>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-slider/gi)).toBeTruthy();
    },
};
