import { CupButton } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

type ButtonStoryArgs = {
    label: string;
    variant: "filled" | "tinted" | "gray" | "plain" | "liquid-glass";
    size: "sm" | "md" | "lg";
    disabled: boolean;
    loading: boolean;
    destructive: boolean;
    fullWidth: boolean;
    iconOnly: boolean;
    icon?: string;
    iconPosition: "start" | "end";
    ariaLabel?: string;
};

const demoStyles = `
    <style>
        .sb-button-demo {
            display: grid;
            gap: 24px;
            max-inline-size: 1080px;
        }

        .sb-button-surface {
            display: grid;
            gap: 20px;
            padding: 28px;
            border-radius: 28px;
            background: var(--cup-bg-grouped-secondary);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-button-header {
            display: grid;
            gap: 6px;
        }

        .sb-button-eyebrow {
            margin: 0;
            color: var(--cup-tint);
            font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
            letter-spacing: 0.01em;
            text-transform: uppercase;
        }

        .sb-button-title {
            margin: 0;
            color: var(--cup-label);
            font: 600 28px/1.1 -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .sb-button-caption {
            margin: 0;
            max-inline-size: 720px;
            color: var(--cup-label-secondary);
            font: 500 14px/1.45 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-button-scroll {
            overflow-x: auto;
            padding-block-end: 4px;
        }

        .sb-button-matrix {
            display: grid;
            grid-template-columns: 88px repeat(7, minmax(96px, 1fr));
            gap: 12px 14px;
            align-items: center;
            min-inline-size: 920px;
        }

        .sb-button-column,
        .sb-button-row-label {
            color: var(--cup-label-secondary);
            font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-button-row-label {
            padding-inline-end: 8px;
        }

        .sb-button-cell {
            display: flex;
            justify-content: flex-start;
        }

        .sb-button-content {
            display: grid;
            gap: 16px;
        }

        .sb-button-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
        }

        .sb-button-grid {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .sb-button-panel {
            display: grid;
            gap: 16px;
            padding: 18px;
            border-radius: 22px;
            background: var(--cup-bg);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-button-panel-title {
            margin: 0;
            color: var(--cup-label);
            font: 600 15px/1.25 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-button-panel--grouped {
            background: var(--cup-bg-grouped);
        }

        .sb-button-panel--media {
            background:
                radial-gradient(circle at top left, rgb(255 255 255 / 0.26), transparent 28%),
                linear-gradient(135deg, #9fc7ff 0%, #d7e6ff 34%, #e8e1ff 100%);
            border-color: rgb(255 255 255 / 0.28);
        }

        [data-mode='dark'] .sb-button-panel--media {
            background:
                radial-gradient(circle at top left, rgb(255 255 255 / 0.10), transparent 28%),
                linear-gradient(135deg, #111827 0%, #172554 40%, #312e81 100%);
            border-color: rgb(255 255 255 / 0.08);
        }

        .sb-button-panel--chrome {
            background: var(--cup-material-chrome);
        }

        @media (max-width: 720px) {
            .sb-button-surface {
                padding: 20px;
                border-radius: 24px;
            }

            .sb-button-title {
                font-size: 22px;
            }

            .sb-button-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

const meta: Meta<CupButton & ButtonStoryArgs> = {
    title: "Components / Button",
    component: CupButton,
    decorators: [
        moduleMetadata({
            imports: [CupButton],
        }),
    ],
    parameters: {
        layout: "fullscreen",
    },
    args: {
        label: "Continue",
        variant: "filled",
        size: "md",
        disabled: false,
        loading: false,
        destructive: false,
        fullWidth: false,
        iconOnly: false,
        icon: "arrow.right",
        iconPosition: "end",
        ariaLabel: "Continue",
    },
    argTypes: {
        label: { control: "text" },
        variant: {
            control: "select",
            options: ["filled", "tinted", "gray", "plain", "liquid-glass"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        disabled: { control: "boolean" },
        loading: { control: "boolean" },
        destructive: { control: "boolean" },
        fullWidth: { control: "boolean" },
        iconOnly: { control: "boolean" },
        icon: { control: "text" },
        iconPosition: {
            control: "select",
            options: ["start", "end"],
        },
        ariaLabel: { control: "text" },
        clicked: { action: "clicked" },
    },
};

export default meta;
type Story = StoryObj<CupButton & ButtonStoryArgs>;

function renderButton(args: Record<string, unknown>, element: "button" | "a" = "button") {
    const tagOpen = element === "a" ? '<a href="#"' : '<button type="button"';
    const tagClose = element === "a" ? "</a>" : "</button>";

    return {
        props: args,
        template: `
            ${tagOpen}
                cup-button
                [variant]="variant"
                [size]="size"
                [disabled]="disabled"
                [loading]="loading"
                [destructive]="destructive"
                [fullWidth]="fullWidth"
                [iconOnly]="iconOnly"
                [icon]="icon"
                [iconPosition]="iconPosition"
                [ariaLabel]="ariaLabel"
            >
                {{ label }}
            ${tagClose}
        `,
    };
}

export const Playground: Story = {
    render: (args) => renderButton(args),
};

export const AppleMatrix: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <p class="sb-button-eyebrow">Apple DS</p>
                        <h3 class="sb-button-title">Push Buttons</h3>
                        <p class="sb-button-caption">Matrix aligned to the shared token system. Theme and tint come from the Storybook toolbar, not from duplicated light or dark sections inside the story.</p>
                    </div>

                    <div class="sb-button-scroll">
                        <div class="sb-button-matrix">
                            <div></div>
                            <div class="sb-button-column">Gray</div>
                            <div class="sb-button-column">Filled</div>
                            <div class="sb-button-column">Tinted</div>
                            <div class="sb-button-column">Red Tint</div>
                            <div class="sb-button-column">Red Fill</div>
                            <div class="sb-button-column">Plain</div>
                            <div class="sb-button-column">Red Plain</div>

                            <div class="sb-button-row-label">Default</div>
                            <div class="sb-button-cell"><button cup-button variant="gray">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted" [destructive]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled" [destructive]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain" [destructive]="true">Label</button></div>

                            <div class="sb-button-row-label">Icon</div>
                            <div class="sb-button-cell"><button cup-button variant="gray" icon="heart.fill" iconPosition="start">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled" icon="arrow.right" iconPosition="end">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted" icon="play.fill" iconPosition="start">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted" [destructive]="true" icon="trash.fill" iconPosition="start">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled" [destructive]="true" icon="trash.fill" iconPosition="start">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain" icon="chevron.right" iconPosition="end">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain" [destructive]="true" icon="trash.fill" iconPosition="start">Label</button></div>

                            <div class="sb-button-row-label">Disabled</div>
                            <div class="sb-button-cell"><button cup-button variant="gray" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="tinted" [destructive]="true" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="filled" [destructive]="true" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain" [disabled]="true">Label</button></div>
                            <div class="sb-button-cell"><button cup-button variant="plain" [destructive]="true" [disabled]="true">Label</button></div>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const ContentMatrix: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Content and Sizing</h3>
                        <p class="sb-button-caption">Checks text-only, leading and trailing icons, icon-only actions, and full-width layout using the current Storybook theme and tint.</p>
                    </div>

                    <div class="sb-button-content">
                        <div class="sb-button-row">
                            <button cup-button variant="filled" size="sm" icon="play.fill" iconPosition="start">Play</button>
                            <button cup-button variant="filled" icon="play.fill" iconPosition="start">Play</button>
                            <button cup-button variant="filled" size="lg" icon="play.fill" iconPosition="start">Play</button>
                        </div>

                        <div class="sb-button-row">
                            <button cup-button variant="gray" icon="arrow.right" iconPosition="end">Continue</button>
                            <button cup-button variant="tinted" icon="heart.fill" iconPosition="start">Favorite</button>
                            <button cup-button variant="plain" icon="chevron.right" iconPosition="end">See More</button>
                            <button cup-button variant="liquid-glass" icon="sparkles" iconPosition="start">Glass</button>
                        </div>

                        <div class="sb-button-row">
                            <button cup-button variant="filled" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                            <button cup-button variant="gray" [iconOnly]="true" icon="checkmark.circle.fill" ariaLabel="Select"></button>
                            <button cup-button variant="plain" [iconOnly]="true" icon="arrow.right" ariaLabel="Next"></button>
                            <button cup-button variant="liquid-glass" [iconOnly]="true" icon="heart.fill" ariaLabel="Favorite"></button>
                        </div>

                        <button cup-button variant="filled" [fullWidth]="true">Full Width Action</button>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const LiquidGlassSurfaces: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Liquid Glass Surfaces</h3>
                        <p class="sb-button-caption">The premium variant is checked over grouped, media, and chrome-like surfaces without hardcoding a separate dark or light story.</p>
                    </div>

                    <div class="sb-button-grid">
                        <section class="sb-button-panel sb-button-panel--grouped">
                            <h4 class="sb-button-panel-title">Grouped</h4>
                            <div class="sb-button-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="liquid-glass" icon="heart.fill" iconPosition="start">Favorite</button>
                            </div>
                        </section>

                        <section class="sb-button-panel sb-button-panel--media">
                            <h4 class="sb-button-panel-title">Media</h4>
                            <div class="sb-button-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="liquid-glass" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                            </div>
                        </section>

                        <section class="sb-button-panel sb-button-panel--chrome">
                            <h4 class="sb-button-panel-title">Chrome</h4>
                            <div class="sb-button-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="liquid-glass" [destructive]="true">Delete</button>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const AsLink: Story = {
    render: (args) => renderButton(args, "a"),
    args: {
        label: "Open Details",
        variant: "plain",
        icon: "arrow.right",
        iconPosition: "end",
        ariaLabel: "Open details",
    },
};
