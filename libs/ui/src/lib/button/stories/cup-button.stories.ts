import { CupButton } from "@ngx-cupertino/ui";
import { ALL_ICONS } from "@ngx-cupertino/ui/icons";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { demoStyles } from "./cup-button.demo";

// Empty string -> no icon; the rest are the design-system SF Symbol names (the autocompleted set).
const ICON_OPTIONS = ["", ...ALL_ICONS.map((d) => d.name)];

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

const meta: Meta<CupButton & ButtonStoryArgs> = {
    title: "Components / Button",
    component: CupButton,
    tags: ["autodocs"],
    decorators: [moduleMetadata({ imports: [CupButton] })],
    parameters: { layout: "fullscreen" },
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
        size: { control: "select", options: ["sm", "md", "lg"] },
        shape: { control: "select", options: ["auto", "capsule", "rounded", "circle"] },
        role: { control: "select", options: ["default", "cancel", "destructive"] },
        preferred: { control: "boolean" },
        disabled: { control: "boolean" },
        loading: { control: "boolean" },
        destructive: { control: "boolean" },
        fullWidth: { control: "boolean" },
        iconOnly: { control: "boolean" },
        icon: { control: "select", options: ICON_OPTIONS },
        iconPosition: { control: "select", options: ["start", "end"] },
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

/** Interactive playground — adjust every input from the Controls panel. */
export const Playground: Story = {
    render: (args) => renderButton(args),
};

/** All seven variants, in default and disabled states, plus the macOS rounded shape. */
export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The full variant set: `filled`, `tinted`, `gray`, `bordered` (neutral outline), `plain` (lighter weight), `liquid-glass`, `glass-prominent`. The first block uses the iOS capsule shape; the second pins `shape="rounded"` for the macOS look.',
            },
        },
    },
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Variants</h3>
                        <p class="sb-caption">Default and disabled states. Theme and tint come from the Storybook toolbar.</p>
                    </div>
                    <div class="sb-stack">
                        <span class="sb-rowlabel">iOS · capsule (default)</span>
                        <div class="sb-row">
                            <button cup-button variant="filled">Filled</button>
                            <button cup-button variant="tinted">Tinted</button>
                            <button cup-button variant="gray">Gray</button>
                            <button cup-button variant="bordered">Bordered</button>
                            <button cup-button variant="plain">Plain</button>
                            <button cup-button variant="liquid-glass">Glass</button>
                            <button cup-button variant="glass-prominent">Glass+</button>
                        </div>
                        <div class="sb-row">
                            <button cup-button variant="filled" [disabled]="true">Filled</button>
                            <button cup-button variant="tinted" [disabled]="true">Tinted</button>
                            <button cup-button variant="gray" [disabled]="true">Gray</button>
                            <button cup-button variant="bordered" [disabled]="true">Bordered</button>
                            <button cup-button variant="plain" [disabled]="true">Plain</button>
                            <button cup-button variant="liquid-glass" [disabled]="true">Glass</button>
                            <button cup-button variant="glass-prominent" [disabled]="true">Glass+</button>
                        </div>
                        <span class="sb-rowlabel">macOS · rounded</span>
                        <div class="sb-row">
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

/** Size scale. On touch (`pointer: coarse`), `sm` rises to a 44pt hit target with compact padding. */
export const Sizes: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Sizes</h3>
                        <p class="sb-caption">sm, md, lg across text and icon-only. On touch, sm keeps a 44pt minimum hit target.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <button cup-button variant="filled" size="sm">Small</button>
                            <button cup-button variant="filled" size="md">Medium</button>
                            <button cup-button variant="filled" size="lg">Large</button>
                        </div>
                        <div class="sb-row">
                            <button cup-button variant="bordered" size="sm">Small</button>
                            <button cup-button variant="bordered" size="md">Medium</button>
                            <button cup-button variant="bordered" size="lg">Large</button>
                        </div>
                        <div class="sb-row">
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

/** Border shape (Apple `buttonBorderShape`). Icon-only resolves to `circle` by default. */
export const Shapes: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Shapes</h3>
                        <p class="sb-caption">auto (platform default), capsule, rounded-rect, and circle. Icon-only with the default shape is a perfect circle.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <span class="sb-rowlabel">auto</span>
                            <button cup-button variant="filled">Label</button>
                            <button cup-button variant="filled" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">capsule</span>
                            <button cup-button variant="filled" shape="capsule">Label</button>
                            <button cup-button variant="filled" shape="capsule" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" shape="capsule" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">rounded</span>
                            <button cup-button variant="filled" shape="rounded">Label</button>
                            <button cup-button variant="filled" shape="rounded" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" shape="rounded" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">circle</span>
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

/** Semantic role (Apple `ButtonRole`): default, cancel, destructive. The deprecated `destructive` flag maps to `role="destructive"`. */
export const Roles: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Roles</h3>
                        <p class="sb-caption">Role across variants, plus the deprecated destructive flag mapping to role="destructive".</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <span class="sb-rowlabel">default</span>
                            <button cup-button variant="filled">Save</button>
                            <button cup-button variant="tinted">Save</button>
                            <button cup-button variant="bordered">Save</button>
                            <button cup-button variant="plain">Save</button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">cancel</span>
                            <button cup-button variant="plain" role="cancel">Cancel</button>
                            <button cup-button variant="gray" role="cancel">Cancel</button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">destructive</span>
                            <button cup-button variant="filled" role="destructive">Delete</button>
                            <button cup-button variant="tinted" role="destructive">Delete</button>
                            <button cup-button variant="bordered" role="destructive">Delete</button>
                            <button cup-button variant="plain" role="destructive">Delete</button>
                        </div>
                        <div class="sb-row">
                            <span class="sb-rowlabel">deprecated</span>
                            <button cup-button variant="filled" [destructive]="true">Delete (flag)</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Enabled, loading, and disabled. Press darkens the fill (Apple-style, no scale); Tab shows the focus ring. */
export const States: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">States</h3>
                        <p class="sb-caption">Press a button to see the fill darken (Apple-style highlight, no scale); Tab to see the focus ring.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <button cup-button variant="filled">Enabled</button>
                            <button cup-button variant="filled" [loading]="true">Loading</button>
                            <button cup-button variant="filled" [disabled]="true">Disabled</button>
                        </div>
                        <div class="sb-row">
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

/** Leading/trailing icons, icon-only actions, and full-width layout. */
export const IconsAndContent: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Icons & Content</h3>
                        <p class="sb-caption">Leading and trailing icons, circular icon-only actions, and a full-width action.</p>
                    </div>
                    <div class="sb-stack">
                        <div class="sb-row">
                            <button cup-button variant="filled" icon="arrow.right" iconPosition="end">Continue</button>
                            <button cup-button variant="tinted" icon="heart.fill" iconPosition="start">Favorite</button>
                            <button cup-button variant="plain" icon="chevron.right" iconPosition="end">See More</button>
                            <button cup-button variant="liquid-glass" icon="sparkles" iconPosition="start">Glass</button>
                        </div>
                        <div class="sb-row">
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

/** The preferred/default action: a prominent filled button paired with a plain Cancel (Apple Default / Preferred). Distinguished by prominence + Return, not a halo. */
export const PreferredAction: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Preferred Action</h3>
                        <p class="sb-caption">A dialog-style pair: a plain Cancel alongside the prominent, preferred Save (the default action that responds to Return).</p>
                    </div>
                    <div class="sb-row">
                        <button cup-button variant="plain" role="cancel">Cancel</button>
                        <button cup-button variant="filled" preferred>Save</button>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Liquid Glass and glass-prominent over grouped, media, and chrome surfaces. Material follows the global data-liquid-glass-variant. */
export const LiquidGlass: Story = {
    render: () => ({
        template: `
            ${demoStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">Liquid Glass</h3>
                        <p class="sb-caption">liquid-glass and glass-prominent checked over grouped, media, and chrome surfaces.</p>
                    </div>
                    <div class="sb-grid">
                        <section class="sb-panel sb-panel--grouped">
                            <h4 class="sb-panel-title">Grouped</h4>
                            <div class="sb-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="liquid-glass" icon="heart.fill" iconPosition="start">Favorite</button>
                            </div>
                        </section>
                        <section class="sb-panel sb-panel--media">
                            <h4 class="sb-panel-title">Media</h4>
                            <div class="sb-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="glass-prominent">Glass+</button>
                                <button cup-button variant="liquid-glass" [iconOnly]="true" icon="play.fill" ariaLabel="Play"></button>
                            </div>
                        </section>
                        <section class="sb-panel sb-panel--chrome">
                            <h4 class="sb-panel-title">Chrome</h4>
                            <div class="sb-row">
                                <button cup-button variant="liquid-glass">Glass</button>
                                <button cup-button variant="liquid-glass" role="destructive">Delete</button>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** Use `a[cup-button]` for navigation. In production it should point to a real href; icon-only links need an ariaLabel. */
export const AsLink: Story = {
    parameters: {
        docs: {
            description: {
                story: "Use `a[cup-button]` for navigation targets, not inline actions. The link cursor (hand) is correct here; plain buttons keep the arrow cursor, matching macOS.",
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
