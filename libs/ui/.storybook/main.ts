import path from "node:path";
import { StorybookConfig } from "@analogjs/storybook-angular";

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@analogjs/storybook-angular",
        options: {},
    },
    features: {},
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@ngx-cupertino/icons": path.resolve("libs/icons/src/index.ts"),
            "@ngx-cupertino/core": path.resolve("libs/core/src/index.ts"),
            "@ngx-cupertino/tokens": path.resolve("libs/tokens/src/index.ts"),
        };
        return config;
    },
};

export default config;
