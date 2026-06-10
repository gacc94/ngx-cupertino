import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@storybook/angular",
        options: {
            builder: {
                sass: {
                    // stylePreprocessorOptions via Angular builder
                    includePaths: ["libs/tokens/src/lib"],
                },
            },
        },
    },
};

export default config;
