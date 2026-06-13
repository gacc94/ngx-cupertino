/// <reference types="vite/client" />
import "./styles.scss";
import { provideCupertino } from "@ngx-cupertino/core";
import { provideCupIcons } from "@ngx-cupertino/icons";
import type { Decorator, Preview } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";

type StorybookTheme = "light" | "dark";
type StorybookSurfaceStyle = "base" | "liquid-glass";
type StorybookLiquidGlassVariant = "regular" | "clear";
type StorybookLiquidGlassPreferredLook = "system" | "clear" | "tinted";
type StorybookGlobals = {
    theme?: unknown;
    tint?: unknown;
    surfaceStyle?: unknown;
    liquidGlassVariant?: unknown;
    liquidGlassPreferredLook?: unknown;
};

function syncCupertinoRootDatasets(options: {
    theme: StorybookTheme;
    tint: string;
    surfaceStyle: StorybookSurfaceStyle;
    liquidGlassVariant: StorybookLiquidGlassVariant;
    liquidGlassPreferredLook: StorybookLiquidGlassPreferredLook;
}): void {
    if (typeof document === "undefined") {
        return;
    }

    const root = document.documentElement;

    // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
    root.dataset["mode"] = options.theme;
    // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
    root.dataset["tint"] = options.tint;
    // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
    root.dataset["surfaceStyle"] = options.surfaceStyle;

    if (options.surfaceStyle === "liquid-glass") {
        // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
        root.dataset["liquidGlassVariant"] = options.liquidGlassVariant;
        // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
        root.dataset["liquidGlassLook"] = options.liquidGlassPreferredLook;
        return;
    }

    // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
    delete root.dataset["liquidGlassVariant"];
    // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
    delete root.dataset["liquidGlassLook"];
}

const withCupertinoGlobals: Decorator = (story, context) => {
    const globals = context.globals as StorybookGlobals;

    const theme: StorybookTheme = globals.theme === "dark" ? "dark" : "light";
    const tint = typeof globals.tint === "string" ? globals.tint : "blue";
    const surfaceStyle: StorybookSurfaceStyle = globals.surfaceStyle === "liquid-glass" ? "liquid-glass" : "base";
    const liquidGlassVariant: StorybookLiquidGlassVariant =
        globals.liquidGlassVariant === "clear" ? "clear" : "regular";
    const liquidGlassPreferredLook: StorybookLiquidGlassPreferredLook =
        globals.liquidGlassPreferredLook === "clear"
            ? "clear"
            : globals.liquidGlassPreferredLook === "tinted"
              ? "tinted"
              : "system";
    const storyResult = story();

    syncCupertinoRootDatasets({ theme, tint, surfaceStyle, liquidGlassVariant, liquidGlassPreferredLook });

    const glassAttrs =
        surfaceStyle === "liquid-glass"
            ? ` data-liquid-glass-variant="${liquidGlassVariant}" data-liquid-glass-look="${liquidGlassPreferredLook}"`
            : "";

    return {
        ...storyResult,
        template: `<div data-mode="${theme}" data-tint="${tint}" data-surface-style="${surfaceStyle}"${glassAttrs} style="min-block-size: 100dvh; padding: 24px; background: var(--cup-bg); color: var(--cup-label);">${storyResult.template ?? ""}</div>`,
    };
};

const preview: Preview = {
    globalTypes: {
        theme: {
            description: "Cupertino theme",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                dynamicTitle: true,
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
            },
        },
        tint: {
            description: "Cupertino tint",
            toolbar: {
                title: "Tint",
                icon: "paintbrush",
                dynamicTitle: true,
                items: [
                    { value: "blue", title: "Blue" },
                    { value: "brown", title: "Brown" },
                    { value: "cyan", title: "Cyan" },
                    { value: "gray", title: "Gray" },
                    { value: "green", title: "Green" },
                    { value: "indigo", title: "Indigo" },
                    { value: "mint", title: "Mint" },
                    { value: "orange", title: "Orange" },
                    { value: "pink", title: "Pink" },
                    { value: "purple", title: "Purple" },
                    { value: "red", title: "Red" },
                    { value: "teal", title: "Teal" },
                    { value: "yellow", title: "Yellow" },
                ],
            },
        },
        surfaceStyle: {
            description: "Global Cupertino surface style",
            toolbar: {
                title: "Surface",
                icon: "mirror",
                dynamicTitle: true,
                items: [
                    { value: "base", title: "Base" },
                    { value: "liquid-glass", title: "Liquid Glass" },
                ],
            },
        },
        liquidGlassVariant: {
            description: "Liquid Glass material variant",
            toolbar: {
                title: "Glass",
                icon: "contrast",
                dynamicTitle: true,
                items: [
                    { value: "regular", title: "Regular" },
                    { value: "clear", title: "Clear" },
                ],
            },
        },
        liquidGlassPreferredLook: {
            description: "Liquid Glass preferred look",
            toolbar: {
                title: "Look",
                icon: "photo",
                dynamicTitle: true,
                items: [
                    { value: "system", title: "System" },
                    { value: "clear", title: "Clear" },
                    { value: "tinted", title: "Tinted" },
                ],
            },
        },
    },
    initialGlobals: {
        theme: "light",
        tint: "blue",
        surfaceStyle: "base",
        liquidGlassVariant: "regular",
        liquidGlassPreferredLook: "system",
    },
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
            providers: [provideCupertino(), provideCupIcons()],
        }),
        withCupertinoGlobals,
    ],
    tags: ["autodocs"],
};

export default preview;
