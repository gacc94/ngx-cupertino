import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { StorybookConfig } from "@analogjs/storybook-angular";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "../../..");

const cupertinoPackages = [
    {
        name: "@ngx-cupertino/ui",
        source: "libs/ui/src/index.ts",
        dist: "dist/libs/ui/fesm2022/ngx-cupertino-ui.mjs",
    },
    {
        name: "@ngx-cupertino/icons",
        source: "libs/icons/src/index.ts",
        dist: "dist/libs/icons/fesm2022/ngx-cupertino-icons.mjs",
    },
    {
        name: "@ngx-cupertino/core",
        source: "libs/core/src/index.ts",
        dist: "dist/libs/core/fesm2022/ngx-cupertino-core.mjs",
    },
] as const;

type PackageMode = "dist" | "source";

function getStorybookEnvironment(): { base: string; packageMode: PackageMode } {
    const packageMode = process.env["STORYBOOK_PACKAGE_MODE"] ?? "dist";

    if (packageMode !== "dist" && packageMode !== "source") {
        throw new Error(`Invalid STORYBOOK_PACKAGE_MODE="${packageMode}". Use "dist" or "source".`);
    }

    return {
        base: process.env["STORYBOOK_BASE"] ?? "/",
        packageMode,
    };
}

function fromWorkspace(relativePath: string): string {
    return path.resolve(workspaceRoot, relativePath);
}

function createCupertinoAliases(packageMode: PackageMode): Record<string, string> {
    return Object.fromEntries(
        cupertinoPackages.map((pkg) => {
            const resolvedPath = fromWorkspace(pkg[packageMode]);

            if (packageMode === "dist" && !fs.existsSync(resolvedPath)) {
                throw new Error(
                    `Storybook package ${pkg.name} was not built at ${resolvedPath}. Run "bun nx build ui" first.`,
                );
            }

            return [pkg.name, resolvedPath];
        }),
    );
}

const storybookEnvironment = getStorybookEnvironment();

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@analogjs/storybook-angular",
        options: {},
    },
    features: {},
    viteFinal: async (config) => {
        config.base = storybookEnvironment.base;
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            ...createCupertinoAliases(storybookEnvironment.packageMode),
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
