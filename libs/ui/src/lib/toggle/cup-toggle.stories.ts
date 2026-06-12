import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CupToggle } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

type ToggleStoryArgs = {
    label: string;
    checked: boolean;
    size: "sm" | "md" | "lg";
    labelPosition: "start" | "end";
    ariaLabel?: string;
};

const demoStyles = `
    <style>
        .sb-toggle-demo {
            display: grid;
            gap: 24px;
            max-inline-size: 1080px;
        }

        .sb-toggle-surface {
            display: grid;
            gap: 20px;
            padding: 28px;
            border-radius: 28px;
            background: var(--cup-bg-grouped-secondary);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-toggle-header {
            display: grid;
            gap: 6px;
        }

        .sb-toggle-eyebrow {
            margin: 0;
            color: var(--cup-tint);
            font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
            letter-spacing: 0.01em;
            text-transform: uppercase;
        }

        .sb-toggle-title {
            margin: 0;
            color: var(--cup-label);
            font: 600 28px/1.1 -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
        }

        .sb-toggle-caption {
            margin: 0;
            max-inline-size: 760px;
            color: var(--cup-label-secondary);
            font: 500 14px/1.45 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-toggle-grid {
            display: grid;
            gap: 12px 14px;
            grid-template-columns: 112px repeat(3, minmax(120px, 1fr));
            align-items: center;
        }

        .sb-toggle-col,
        .sb-toggle-row {
            color: var(--cup-label-secondary);
            font: 600 12px/1.2 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-toggle-cell {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .sb-toggle-stack {
            display: grid;
            gap: 16px;
        }

        .sb-toggle-pair {
            display: flex;
            flex-wrap: wrap;
            gap: 18px;
            align-items: center;
        }

        .sb-toggle-panel {
            display: grid;
            gap: 14px;
            padding: 18px;
            border-radius: 22px;
            background: var(--cup-bg);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-toggle-panel-title {
            margin: 0;
            color: var(--cup-label);
            font: 600 15px/1.25 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        .sb-toggle-note {
            margin: 0;
            color: var(--cup-label-secondary);
            font: 500 12px/1.45 -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }

        @media (max-width: 720px) {
            .sb-toggle-surface {
                padding: 20px;
                border-radius: 24px;
            }

            .sb-toggle-title {
                font-size: 22px;
            }

            .sb-toggle-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

const meta: Meta<CupToggle & ToggleStoryArgs> = {
    title: "Components / Toggle",
    component: CupToggle,
    decorators: [
        moduleMetadata({
            imports: [CupToggle, ReactiveFormsModule],
        }),
    ],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Apple-style switch control with CVA support, size variants, and label positioning. Theme and tint come from the Storybook toolbar globals.",
            },
        },
    },
    argTypes: {
        checked: { control: "boolean" },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        labelPosition: {
            control: "select",
            options: ["start", "end"],
        },
        ariaLabel: { control: "text" },
        label: { control: "text" },
    },
    args: {
        label: "Wi-Fi",
        checked: false,
        size: "md",
        labelPosition: "end",
        ariaLabel: "Wi-Fi",
    },
};

export default meta;

type Story = StoryObj<CupToggle & ToggleStoryArgs>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: "Interactive baseline story for validating the public API before comparing the component against Figma references.",
            },
        },
    },
    render: (args) => ({
        props: args,
        template: `
            <cup-toggle
                [checked]="checked"
                [size]="size"
                [labelPosition]="labelPosition"
                [ariaLabel]="ariaLabel">
                {{ label }}
            </cup-toggle>
        `,
    }),
};

export const StateMatrix: Story = {
    parameters: {
        docs: {
            description: {
                story: "Primary visual review matrix. Use this story to compare unchecked, checked, and disabled states across all three supported sizes during the refactor.",
            },
        },
    },
    render: () => {
        const disabledSmall = new FormControl({ value: false, disabled: true });
        const disabledMedium = new FormControl({ value: false, disabled: true });
        const disabledLarge = new FormControl({ value: false, disabled: true });

        return {
            props: { disabledSmall, disabledMedium, disabledLarge },
            template: `
            ${demoStyles}
            <div class="sb-toggle-demo">
                <section class="sb-toggle-surface">
                    <header class="sb-toggle-header">
                        <p class="sb-toggle-eyebrow">State matrix</p>
                        <h2 class="sb-toggle-title">Sizes and state transitions</h2>
                        <p class="sb-toggle-caption">
                            This matrix should remain in sync with the refinement plan and is the main Storybook checkpoint
                            for visual parity against the macOS and iOS/iPadOS references.
                        </p>
                    </header>

                    <div class="sb-toggle-grid">
                        <div></div>
                        <div class="sb-toggle-col">Small</div>
                        <div class="sb-toggle-col">Medium</div>
                        <div class="sb-toggle-col">Large</div>

                        <div class="sb-toggle-row">Off</div>
                        <div class="sb-toggle-cell"><cup-toggle size="sm" ariaLabel="Small off"></cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle ariaLabel="Medium off"></cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle size="lg" ariaLabel="Large off"></cup-toggle></div>

                        <div class="sb-toggle-row">On</div>
                        <div class="sb-toggle-cell"><cup-toggle size="sm" [checked]="true" ariaLabel="Small on"></cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle [checked]="true" ariaLabel="Medium on"></cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle size="lg" [checked]="true" ariaLabel="Large on"></cup-toggle></div>

                        <div class="sb-toggle-row">Disabled</div>
                        <div class="sb-toggle-cell"><cup-toggle size="sm" [formControl]="disabledSmall">Small disabled</cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle [formControl]="disabledMedium">Medium disabled</cup-toggle></div>
                        <div class="sb-toggle-cell"><cup-toggle size="lg" [formControl]="disabledLarge">Large disabled</cup-toggle></div>
                    </div>
                </section>
            </div>
        `,
        };
    },
};

export const LabelPositions: Story = {
    parameters: {
        docs: {
            description: {
                story: "Validates the layout contract for projected labels. Keep this story aligned with the host class `label-start` and spacing decisions in the refactor.",
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-toggle-demo">
                <section class="sb-toggle-surface">
                    <header class="sb-toggle-header">
                        <p class="sb-toggle-eyebrow">Layout</p>
                        <h2 class="sb-toggle-title">Projected label positions</h2>
                        <p class="sb-toggle-caption">
                            The label must remain visually balanced whether it appears before or after the switch control.
                        </p>
                    </header>

                    <div class="sb-toggle-pair">
                        <div class="sb-toggle-panel">
                            <h3 class="sb-toggle-panel-title">Label end</h3>
                            <cup-toggle [checked]="true">AirDrop</cup-toggle>
                            <p class="sb-toggle-note">Default content flow for settings lists.</p>
                        </div>

                        <div class="sb-toggle-panel">
                            <h3 class="sb-toggle-panel-title">Label start</h3>
                            <cup-toggle [checked]="true" labelPosition="start">AirDrop</cup-toggle>
                            <p class="sb-toggle-note">Useful for reverse layouts and compact control groups.</p>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

export const DisabledStates: Story = {
    parameters: {
        docs: {
            description: {
                story: "Documents both disabled variants explicitly. This is required because Apple-like disabled switches are sensitive to contrast and opacity tuning.",
            },
        },
    },
    render: () => {
        const checkedControl = new FormControl({ value: true, disabled: true });
        const uncheckedControl = new FormControl({ value: false, disabled: true });

        return {
            props: { checkedControl, uncheckedControl },
            template: `
                ${demoStyles}
                <div class="sb-toggle-demo">
                    <section class="sb-toggle-surface">
                        <header class="sb-toggle-header">
                            <p class="sb-toggle-eyebrow">Disabled</p>
                            <h2 class="sb-toggle-title">Disabled on and off</h2>
                            <p class="sb-toggle-caption">
                                Keep both states visible in Storybook so disabled fill, border, and thumb contrast can be reviewed after token tuning.
                            </p>
                        </header>

                        <div class="sb-toggle-pair">
                            <div class="sb-toggle-panel">
                                <h3 class="sb-toggle-panel-title">Disabled checked</h3>
                                <cup-toggle [formControl]="checkedControl">Automatic Updates</cup-toggle>
                            </div>

                            <div class="sb-toggle-panel">
                                <h3 class="sb-toggle-panel-title">Disabled unchecked</h3>
                                <cup-toggle [formControl]="uncheckedControl">Automatic Updates</cup-toggle>
                            </div>
                        </div>
                    </section>
                </div>
            `,
        };
    },
};

export const FormControlIntegration: Story = {
    parameters: {
        docs: {
            description: {
                story: "Confirms the intended usage path in reactive forms. Keep this story while the component remains CVA-backed through `CupFormControl<boolean>`.",
            },
        },
    },
    render: () => {
        const control = new FormControl(true, { nonNullable: true });

        return {
            props: { control },
            template: `
                ${demoStyles}
                <div class="sb-toggle-demo">
                    <section class="sb-toggle-surface">
                        <header class="sb-toggle-header">
                            <p class="sb-toggle-eyebrow">Forms</p>
                            <h2 class="sb-toggle-title">Reactive Forms integration</h2>
                            <p class="sb-toggle-caption">
                                The form control should remain the authoritative path for disabled state and value propagation.
                            </p>
                        </header>

                        <div class="sb-toggle-stack">
                            <cup-toggle [formControl]="control">Private Relay</cup-toggle>
                            <p class="sb-toggle-note">Current value: {{ control.value ? 'on' : 'off' }}</p>
                        </div>
                    </section>
                </div>
            `,
        };
    },
};
