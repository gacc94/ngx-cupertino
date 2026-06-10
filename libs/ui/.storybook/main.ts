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
        config.base = process.env.STORYBOOK_BASE || "/";
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@ngx-cupertino/icons": path.resolve("libs/icons/src/index.ts"),
            "@ngx-cupertino/core": path.resolve("libs/core/src/index.ts"),
            "@ngx-cupertino/tokens": path.resolve("libs/tokens/src/index.ts"),
        };
        config.build = config.build || {};
        config.build.rollupOptions = {
            ...config.build.rollupOptions,
            external: [/@angular\/animations/],
        };
        return config;
    },
};

export default config;
