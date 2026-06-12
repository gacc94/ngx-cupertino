/// <reference types="vite/client" />
import "./styles.scss";
import { provideCupIcons } from "@ngx-cupertino/icons";
import type { Decorator, Preview } from "@storybook/angular";
import { applicationConfig } from "@storybook/angular";

const withCupertinoGlobals: Decorator = (story, context) => {
    // biome-ignore lint/complexity/useLiteralKeys: globals has an index signature requiring bracket notation
    const theme = context.globals["theme"] === "dark" ? "dark" : "light";
    // biome-ignore lint/complexity/useLiteralKeys: globals has an index signature requiring bracket notation
    const tint = typeof context.globals["tint"] === "string" ? context.globals["tint"] : "blue";
    const storyResult = story();

    if (typeof document !== "undefined") {
        // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
        document.documentElement.dataset["mode"] = theme;
        // biome-ignore lint/complexity/useLiteralKeys: DOMStringMap index signature requires bracket notation
        document.documentElement.dataset["tint"] = tint;
    }

    return {
        ...storyResult,
        template: `<div data-mode="${theme}" data-tint="${tint}" style="min-block-size: 100dvh; padding: 24px; background: var(--cup-bg); color: var(--cup-label);">${storyResult.template ?? ""}</div>`,
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
    },
    initialGlobals: {
        theme: "light",
        tint: "blue",
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
            providers: [provideCupIcons()],
        }),
        withCupertinoGlobals,
    ],
    tags: ["autodocs"],
};

export default preview;
