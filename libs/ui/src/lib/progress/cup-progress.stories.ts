import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupProgress } from "./cup-progress";

const meta: Meta<CupProgress> = {
    component: CupProgress,
    title: "CupProgress",
};
export default meta;

type Story = StoryObj<CupProgress>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-progress/gi)).toBeTruthy();
    },
};
