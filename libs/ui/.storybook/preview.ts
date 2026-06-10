import type { Preview } from "@storybook/angular";

export const decorators = [
    (storyFn: () => { template: string }) => {
        const story = storyFn();
        return {
            ...story,
            template: `<div data-mode="light" data-tint="blue" style="padding: 24px;">${story.template}</div>`,
        };
    },
];

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    tags: ["autodocs"],
};

export default preview;
