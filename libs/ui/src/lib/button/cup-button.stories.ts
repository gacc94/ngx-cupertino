import { CupButton } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

type ButtonStoryArgs = {
    label: string;
    variant: "filled" | "tinted" | "gray" | "plain" | "bordered" | "liquid-glass" | "glass-prominent";
    size: "sm" | "md" | "lg";
    shape: "auto" | "capsule" | "rounded" | "circle";
    role: "default" | "cancel" | "destructive";
    preferred: boolean;
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

        .sb-button-macos {
            display: grid;
            gap: var(--cup-gap-section);
            max-inline-size: 1440px;
        }

        .sb-button-macos-layout {
            display: grid;
            gap: var(--cup-gap-section);
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            align-items: start;
        }

        .sb-button-macos-panel-shell {
            display: grid;
            gap: var(--cup-space-4);
            padding: var(--cup-space-4);
            border-radius: var(--cup-radius-card);
            background: var(--cup-bg-grouped-secondary);
            border: var(--cup-border-hairline) solid var(--cup-separator);
            box-shadow: var(--cup-shadow-sm);
        }

        .sb-button-macos-badge {
            inline-size: fit-content;
            padding: var(--cup-space-2) var(--cup-space-3);
            border-radius: var(--cup-radius-badge);
            border: var(--cup-border-hairline) solid var(--cup-separator);
            background: var(--cup-bg);
            color: var(--cup-label);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-body);
            font-weight: var(--cup-weight-semibold);
            line-height: 1;
        }

        .sb-button-macos-frame {
            display: grid;
            gap: var(--cup-space-5);
            min-block-size: 100%;
            padding: var(--cup-space-6);
            border-radius: var(--cup-radius-window-compact);
            background: var(--cup-bg);
            border: var(--cup-border-hairline) solid var(--cup-separator);
            box-shadow: var(--cup-shadow-sm);
        }

        .sb-button-macos-caption {
            margin: 0;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-body);
            font-weight: 500;
            line-height: 1.45;
        }

        .sb-button-macos-guide {
            display: grid;
            gap: var(--cup-space-4);
            padding: var(--cup-space-6);
            border-radius: var(--cup-radius-card-lg);
            border: var(--cup-border-thin) dashed var(--cup-tint);
            background: color-mix(in srgb, var(--cup-tint-subtle) 48%, var(--cup-bg) 52%);
        }

        .sb-button-macos-guide-label {
            margin: 0;
            color: var(--cup-tint);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-body);
            font-weight: var(--cup-weight-semibold);
            line-height: 1.2;
        }

        .sb-button-macos-scroll {
            overflow-x: auto;
            padding-block-end: var(--cup-space-1);
        }

        .sb-button-macos-matrix {
            display: grid;
            grid-template-columns: 96px 112px 122px 126px 112px 132px 152px;
            gap: var(--cup-space-3);
            align-items: center;
            min-inline-size: 948px;
        }

        .sb-button-macos-matrix-group {
            display: grid;
            gap: var(--cup-space-3);
        }

        .sb-button-macos-divider {
            block-size: 1px;
            background: var(--cup-separator);
            margin-block: var(--cup-space-1);
        }

        .sb-button-macos-examples {
            display: grid;
            gap: var(--cup-space-6);
        }

        .sb-button-macos-section-title {
            margin: 0;
            color: var(--cup-label);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-title3);
            font-weight: var(--cup-weight-semibold);
            line-height: 1.2;
        }

        .sb-button-macos-section-copy {
            margin: 0;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-body);
            font-weight: 500;
            line-height: 1.45;
        }

        .sb-button-macos-section {
            display: grid;
            gap: var(--cup-space-4);
        }

        .sb-button-macos-section-grid {
            display: grid;
            gap: var(--cup-space-3);
        }

        .sb-button-macos-row {
            display: grid;
            grid-template-columns: 96px 112px 122px 126px 112px 132px 152px;
            gap: var(--cup-space-3);
            align-items: center;
            min-inline-size: 948px;
        }

        .sb-button-macos-cell {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .sb-button-macos-note {
            margin: 0;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-caption1);
            font-weight: 500;
            line-height: 1.45;
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

            .sb-button-macos-layout {
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
        shape: "auto",
        role: "default",
        preferred: false,
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
            options: ["filled", "tinted", "gray", "plain", "bordered", "liquid-glass", "glass-prominent"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        shape: {
            control: "select",
            options: ["auto", "capsule", "rounded", "circle"],
        },
        role: {
            control: "select",
            options: ["default", "cancel", "destructive"],
        },
        preferred: { control: "boolean" },
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
                [shape]="shape"
                [role]="role"
                [preferred]="preferred"
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

export const MacOSDesktopPushButtons: Story = {
    parameters: {
        docs: {
            description: {
                story: "macOS desktop push button reference. This story keeps Storybook theme and tint controls active while documenting the compact desktop push button family as its own platform-specific matrix.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-macos">
                <div class="sb-button-header">
                    <p class="sb-button-eyebrow">macOS / Desktop</p>
                    <h3 class="sb-button-title">Push Buttons</h3>
                    <p class="sb-button-caption">Dedicated desktop documentation for the push button family. The current Storybook theme and tint remain interactive, while the composition itself stays focused on compact macOS desktop semantics.</p>
                </div>

                <div class="sb-button-macos-layout">
                    <section class="sb-button-macos-panel-shell">
                        <div class="sb-button-macos-badge">Push Buttons</div>
                        <div class="sb-button-macos-frame">
                            <p class="sb-button-macos-caption">Reference matrix for compact macOS desktop push buttons. Rows are grouped into accent and neutral desktop treatments, each one showing enabled, emphasized, and disabled states.</p>

                            <div class="sb-button-macos-guide">
                                <p class="sb-button-macos-guide-label">Push Button</p>

                                <div class="sb-button-macos-matrix-group">
                                    <div class="sb-button-macos-scroll">
                                        <div class="sb-button-macos-matrix">
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="filled" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="tinted" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true" [disabled]="true">Label</button>
                                            <button cup-button variant="filled" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start" [disabled]="true">Label</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="sb-button-macos-divider"></div>

                                <div class="sb-button-macos-matrix-group">
                                    <div class="sb-button-macos-scroll">
                                        <div class="sb-button-macos-matrix">
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="filled" size="sm">Label</button>
                                            <button cup-button variant="filled" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="filled" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="tinted" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="tinted" size="sm" [destructive]="true" [disabled]="true">Label</button>
                                            <button cup-button variant="filled" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="filled" size="sm" icon="heart" iconPosition="start" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start" [disabled]="true">Label</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="sb-button-macos-divider"></div>

                                <div class="sb-button-macos-matrix-group">
                                    <div class="sb-button-macos-scroll">
                                        <div class="sb-button-macos-matrix">
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start" [disabled]="true">Label</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="sb-button-macos-divider"></div>

                                <div class="sb-button-macos-matrix-group">
                                    <div class="sb-button-macos-scroll">
                                        <div class="sb-button-macos-matrix">
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true">Label</button>
                                            <button cup-button variant="gray" size="sm">Label</button>
                                            <button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Label</button>

                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" [destructive]="true" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" [disabled]="true">Label</button>
                                            <button cup-button variant="gray" size="sm" icon="heart" iconPosition="start" [disabled]="true">Label</button>
                                            <button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start" [disabled]="true">Label</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="sb-button-macos-panel-shell">
                        <div class="sb-button-macos-badge">Examples</div>
                        <div class="sb-button-macos-frame sb-button-macos-examples">
                            <p class="sb-button-macos-caption">Desktop push button examples documented as a macOS-specific subset. Colored and primary are both included intentionally because the reference treats them as separate examples, even when a given tint may make them read as the same emphasized family.</p>

                            <section class="sb-button-macos-section">
                                <div class="sb-button-header">
                                    <h4 class="sb-button-macos-section-title">Accent Push Buttons</h4>
                                    <p class="sb-button-macos-section-copy">Text-focused push buttons for the compact desktop surface. This section documents Default, Colored, Secondary, Destructive, Primary, Borderless, and Borderless + icon in enabled, emphasized, and disabled states.</p>
                                </div>
                                <div class="sb-button-macos-scroll">
                                    <div class="sb-button-macos-section-grid">
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="bordered" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" role="destructive">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" preferred>Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="bordered" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" role="destructive">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" preferred>Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="bordered" size="sm" [disabled]="true">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" [disabled]="true">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" [disabled]="true">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" role="destructive" [disabled]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" preferred [disabled]="true">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [disabled]="true">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart" iconPosition="start" [disabled]="true">Borderless</button></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section class="sb-button-macos-section">
                                <div class="sb-button-header">
                                    <h4 class="sb-button-macos-section-title">Toolbar-like Push Buttons</h4>
                                    <p class="sb-button-macos-section-copy">Compact desktop arrangements for toolbars and chrome regions. The sixth column stays borderless text-only, while the last column documents the explicit borderless plus icon treatment.</p>
                                </div>
                                <div class="sb-button-macos-scroll">
                                    <div class="sb-button-macos-section-grid">
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" [disabled]="true">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" [disabled]="true">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="tinted" size="sm" [destructive]="true" [disabled]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" [disabled]="true">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="filled" size="sm" icon="heart" iconPosition="start" [disabled]="true">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start" [disabled]="true">Borderless</button></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section class="sb-button-macos-section">
                                <div class="sb-button-header">
                                    <h4 class="sb-button-macos-section-title">Classic Neutral Push Buttons</h4>
                                    <p class="sb-button-macos-section-copy">Classic neutral desktop rows where the compact gray push button becomes the dominant visual family and destructive moves to the red text treatment instead of the accent family.</p>
                                </div>
                                <div class="sb-button-macos-scroll">
                                    <div class="sb-button-macos-section-grid">
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true" [disabled]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [disabled]="true">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart" iconPosition="start" [disabled]="true">Borderless</button></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section class="sb-button-macos-section">
                                <div class="sb-button-header">
                                    <h4 class="sb-button-macos-section-title">Classic Toolbar Rows</h4>
                                    <p class="sb-button-macos-section-copy">Neutral toolbar composition for macOS desktop. This keeps the compact push button language while documenting the borderless and icon-led variants that commonly live in window chrome and toolbar clusters.</p>
                                </div>
                                <div class="sb-button-macos-scroll">
                                    <div class="sb-button-macos-section-grid">
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" icon="heart" iconPosition="start">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start">Borderless</button></div>
                                        </div>
                                        <div class="sb-button-macos-row">
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Default</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Colored</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Secondary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" [destructive]="true" [disabled]="true">Destructive</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" [disabled]="true">Primary</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="gray" size="sm" icon="heart" iconPosition="start" [disabled]="true">Borderless</button></div>
                                            <div class="sb-button-macos-cell"><button cup-button variant="plain" size="sm" icon="heart-crack" iconPosition="start" [disabled]="true">Borderless</button></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <p class="sb-button-macos-note">Desktop note: this story is organized as a macOS-specific platform subset, but it intentionally remains interactive with the Storybook theme and tint toolbar so the same compact matrix can be reviewed across the token-driven color system.</p>
                        </div>
                    </section>
                </div>
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
                        <p class="sb-button-caption">The glass variants (liquid-glass and the tinted glass-prominent) are checked over grouped, media, and chrome-like surfaces. The material follows the global data-liquid-glass-variant set by the design system, not a hardcoded value.</p>
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
                                <button cup-button variant="glass-prominent">Glass+</button>
                                <button cup-button variant="liquid-glass" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                                <button cup-button variant="glass-prominent" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
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

export const Shapes: Story = {
    parameters: {
        docs: {
            description: {
                story: "`shape` control (Apple `buttonBorderShape`). `auto` keeps the platform default (capsule on touch, rounded-rect on desktop); icon-only buttons resolve to `circle` by default.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Shapes</h3>
                        <p class="sb-button-caption">Each row pins an explicit shape across text, leading-icon, and icon-only buttons. Icon-only with the default shape resolves to a perfect circle.</p>
                    </div>

                    <div class="sb-button-content">
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">auto</span>
                            <button cup-button variant="filled">Label</button>
                            <button cup-button variant="filled" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">capsule</span>
                            <button cup-button variant="filled" shape="capsule">Label</button>
                            <button cup-button variant="filled" shape="capsule" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" shape="capsule" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">rounded</span>
                            <button cup-button variant="filled" shape="rounded">Label</button>
                            <button cup-button variant="filled" shape="rounded" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" shape="rounded" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">circle</span>
                            <button cup-button variant="filled" shape="circle" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                            <button cup-button variant="gray" shape="circle" [iconOnly]="true" icon="heart.fill" ariaLabel="Favorite"></button>
                            <button cup-button variant="tinted" shape="circle" [iconOnly]="true" icon="plus" ariaLabel="Add"></button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: "All seven variants: `filled`, `tinted`, `gray`, `bordered` (outline), `plain` (lighter weight), `liquid-glass`, and `glass-prominent` (glass + tint).",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Variants</h3>
                        <p class="sb-button-caption">The full variant set in default and disabled states. The first block is the iOS capsule shape (default); the second pins shape="rounded" to show the macOS rounded-rectangle look.</p>
                    </div>

                    <div class="sb-button-content">
                        <span class="sb-button-row-label">iOS · capsule (default)</span>
                        <div class="sb-button-row">
                            <button cup-button variant="filled">Filled</button>
                            <button cup-button variant="tinted">Tinted</button>
                            <button cup-button variant="gray">Gray</button>
                            <button cup-button variant="bordered">Bordered</button>
                            <button cup-button variant="plain">Plain</button>
                            <button cup-button variant="liquid-glass">Glass</button>
                            <button cup-button variant="glass-prominent">Glass+</button>
                        </div>
                        <div class="sb-button-row">
                            <button cup-button variant="filled" [disabled]="true">Filled</button>
                            <button cup-button variant="tinted" [disabled]="true">Tinted</button>
                            <button cup-button variant="gray" [disabled]="true">Gray</button>
                            <button cup-button variant="bordered" [disabled]="true">Bordered</button>
                            <button cup-button variant="plain" [disabled]="true">Plain</button>
                            <button cup-button variant="liquid-glass" [disabled]="true">Glass</button>
                            <button cup-button variant="glass-prominent" [disabled]="true">Glass+</button>
                        </div>

                        <span class="sb-button-row-label">macOS · rounded</span>
                        <div class="sb-button-row">
                            <button cup-button variant="filled" shape="rounded">Filled</button>
                            <button cup-button variant="tinted" shape="rounded">Tinted</button>
                            <button cup-button variant="gray" shape="rounded">Gray</button>
                            <button cup-button variant="bordered" shape="rounded">Bordered</button>
                            <button cup-button variant="plain" shape="rounded">Plain</button>
                            <button cup-button variant="liquid-glass" shape="rounded">Glass</button>
                            <button cup-button variant="glass-prominent" shape="rounded">Glass+</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const Roles: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Semantic `role` (Apple `ButtonRole`): `default`, `cancel` (plain prominent label), and `destructive` (system red). The deprecated `destructive` flag maps to `role="destructive"`.',
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Roles</h3>
                        <p class="sb-button-caption">Role per variant, plus the deprecated destructive flag mapping to role="destructive".</p>
                    </div>

                    <div class="sb-button-content">
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">default</span>
                            <button cup-button variant="filled">Save</button>
                            <button cup-button variant="tinted">Save</button>
                            <button cup-button variant="bordered">Save</button>
                            <button cup-button variant="plain">Save</button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">cancel</span>
                            <button cup-button variant="plain" role="cancel">Cancel</button>
                            <button cup-button variant="gray" role="cancel">Cancel</button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">destructive</span>
                            <button cup-button variant="filled" role="destructive">Delete</button>
                            <button cup-button variant="tinted" role="destructive">Delete</button>
                            <button cup-button variant="bordered" role="destructive">Delete</button>
                            <button cup-button variant="plain" role="destructive">Delete</button>
                        </div>
                        <div class="sb-button-row">
                            <span class="sb-button-row-label">deprecated</span>
                            <button cup-button variant="filled" [destructive]="true">Delete (flag)</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const PreferredAction: Story = {
    parameters: {
        docs: {
            description: {
                story: "`preferred` marks the default action (Apple `Default / Preferred`) — it is semantic (pairs with a prominent filled button + autofocus/Return), not a ring/halo, matching how Apple distinguishes the default action by prominence rather than a glow.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Preferred Action</h3>
                        <p class="sb-button-caption">A dialog-style action pair: a plain Cancel alongside the prominent, preferred Save (the default action that responds to Return). The prominence comes from the filled style, not from a halo.</p>
                    </div>

                    <div class="sb-button-row">
                        <button cup-button variant="plain" role="cancel">Cancel</button>
                        <button cup-button variant="filled" preferred>Save</button>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: "`sm` / `md` / `lg` across variants. On touch (`pointer: coarse`), `sm` is raised to a 44pt hit target while keeping compact padding.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">Sizes</h3>
                        <p class="sb-button-caption">sm, md, and lg. On touch devices, sm gets a 44pt minimum hit target (compact padding preserved).</p>
                    </div>

                    <div class="sb-button-content">
                        <div class="sb-button-row">
                            <button cup-button variant="filled" size="sm">Small</button>
                            <button cup-button variant="filled" size="md">Medium</button>
                            <button cup-button variant="filled" size="lg">Large</button>
                        </div>
                        <div class="sb-button-row">
                            <button cup-button variant="bordered" size="sm">Small</button>
                            <button cup-button variant="bordered" size="md">Medium</button>
                            <button cup-button variant="bordered" size="lg">Large</button>
                        </div>
                        <div class="sb-button-row">
                            <button cup-button variant="filled" size="sm" [iconOnly]="true" icon="plus" ariaLabel="Add"></button>
                            <button cup-button variant="filled" size="md" [iconOnly]="true" icon="plus" ariaLabel="Add"></button>
                            <button cup-button variant="filled" size="lg" [iconOnly]="true" icon="plus" ariaLabel="Add"></button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: "Loading, disabled, and press feedback. Like Apple, pressing darkens the fill (UIKit highlight / AppKit clicked) — buttons do not scale. Focus-visible shows a ring. Press or Tab a button to observe.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-button-demo">
                <section class="sb-button-surface">
                    <div class="sb-button-header">
                        <h3 class="sb-button-title">States</h3>
                        <p class="sb-button-caption">Enabled, loading, and disabled. Press a button to see the fill darken (Apple-style highlight, no scale); Tab to see the focus ring.</p>
                    </div>

                    <div class="sb-button-content">
                        <div class="sb-button-row">
                            <button cup-button variant="filled">Enabled</button>
                            <button cup-button variant="filled" [loading]="true">Loading</button>
                            <button cup-button variant="filled" [disabled]="true">Disabled</button>
                        </div>
                        <div class="sb-button-row">
                            <button cup-button variant="tinted">Enabled</button>
                            <button cup-button variant="tinted" [loading]="true">Loading</button>
                            <button cup-button variant="tinted" [disabled]="true">Disabled</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const AsLink: Story = {
    parameters: {
        docs: {
            description: {
                story: "Use `a[cup-button]` for navigation targets, not inline actions. In production this pattern should point to a real `href`, and icon-only links must provide an accessible `ariaLabel`.",
            },
        },
    },
    render: (args) => renderButton(args, "a"),
    args: {
        label: "Open Details",
        variant: "plain",
        icon: "arrow.right",
        iconPosition: "end",
        ariaLabel: "Open details",
    },
};
