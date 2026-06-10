import type { Meta, StoryObj } from "@storybook/angular";
import { expect } from "storybook/test";
import { CupStepper } from "./cup-stepper";

const meta: Meta<CupStepper> = {
    component: CupStepper,
    title: "CupStepper",
};
export default meta;

type Story = StoryObj<CupStepper>;

export const Primary: Story = {
    args: {},
};

export const Heading: Story = {
    args: {},
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/cup-stepper/gi)).toBeTruthy();
    },
};
