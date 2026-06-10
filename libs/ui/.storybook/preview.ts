import type { Preview } from "@storybook/angular";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: "light",
            values: [
                { name: "light", value: "#ffffff" },
                { name: "dark", value: "#1c1c1e" },
            ],
        },
    },
    decorators: [
        (story) => ({
            template: `
                <div data-mode="light" data-tint="blue"
                     style="padding: 24px;">
                    <story></story>
                </div>`,
        }),
    ],
};

export default preview;
