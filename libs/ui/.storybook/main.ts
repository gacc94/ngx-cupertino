import fs from "node:fs";
import path from "node:path";
import { StorybookConfig } from "@analogjs/storybook-angular";

const distUi = path.resolve("dist/libs/ui/fesm2022/ngx-cupertino-ui.mjs");
const distIcons = path.resolve("dist/libs/icons/fesm2022/ngx-cupertino-icons.mjs");
const distCore = path.resolve("dist/libs/core/fesm2022/ngx-cupertino-core.mjs");

const useDist = fs.existsSync(distUi);

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@analogjs/storybook-angular",
        options: {},
    },
    features: {},
    viteFinal: async (config) => {
        config.base = process.env["STORYBOOK_BASE"] || "/";
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@ngx-cupertino/ui": useDist ? distUi : path.resolve("libs/ui/src/index.ts"),
            "@ngx-cupertino/icons": useDist ? distIcons : path.resolve("libs/icons/src/index.ts"),
            "@ngx-cupertino/core": useDist ? distCore : path.resolve("libs/core/src/index.ts"),
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
