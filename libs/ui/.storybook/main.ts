import { StorybookConfig } from "@analogjs/storybook-angular";

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@analogjs/storybook-angular",
        options: {},
    },
    features: {},
};

export default config;
