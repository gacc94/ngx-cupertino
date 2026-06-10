/// <reference types="vite/client" />
import "./styles.scss";
import { provideCupertino } from "@ngx-cupertino/core";
import type { Preview } from "@storybook/angular";
import { applicationConfig, componentWrapperDecorator } from "@storybook/angular";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        applicationConfig({
            providers: [provideCupertino({ theme: "auto", tintColor: "blue" })],
        }),
        componentWrapperDecorator(
            (story) => `<div data-mode="light" data-tint="blue" style="padding: 24px;">${story}</div>`,
        ),
    ],
    tags: ["autodocs"],
};

export default preview;
