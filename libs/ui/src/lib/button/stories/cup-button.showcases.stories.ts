import { CupButton } from "@ngx-cupertino/ui";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { demoStyles } from "./cup-button.demo";

// Platform-parity showcases — full matrices for visual 1:1 comparison against the Apple Figma
// files. Kept separate from the functional (single-dimension) stories. Matrix layout uses tokens.
const matrixStyles = `
    <style>
        .sb-matrix {
            display: grid;
            grid-template-columns: max-content repeat(7, minmax(0, 1fr));
            gap: var(--cup-space-3) var(--cup-space-4);
            align-items: center;
            min-inline-size: 880px;
        }

        .sb-matrix-scroll {
            overflow-x: auto;
            padding-block-end: var(--cup-space-1);
        }

        .sb-matrix-col,
        .sb-matrix-rowlabel {
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-caption1);
            font-weight: var(--cup-weight-semibold);
        }
    </style>
`;

const meta: Meta<CupButton> = {
    title: "Components / Button / Showcases",
    component: CupButton,
    decorators: [moduleMetadata({ imports: [CupButton] })],
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<CupButton>;

/** iOS / iPadOS capsule matrix — variants × states, for 1:1 comparison with the iOS Figma. */
export const IOSMatrix: Story = {
    name: "iOS Matrix",
    render: () => ({
        template: `
            ${demoStyles}
            ${matrixStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">iOS Push Buttons</h3>
                        <p class="sb-caption">Capsule variants across default, icon, and disabled rows. Theme and tint come from the toolbar.</p>
                    </div>
                    <div class="sb-matrix-scroll">
                        <div class="sb-matrix">
                            <div></div>
                            <div class="sb-matrix-col">Gray</div>
                            <div class="sb-matrix-col">Filled</div>
                            <div class="sb-matrix-col">Tinted</div>
                            <div class="sb-matrix-col">Red Tint</div>
                            <div class="sb-matrix-col">Red Fill</div>
                            <div class="sb-matrix-col">Plain</div>
                            <div class="sb-matrix-col">Red Plain</div>

                            <div class="sb-matrix-rowlabel">Default</div>
                            <button cup-button variant="gray">Label</button>
                            <button cup-button variant="filled">Label</button>
                            <button cup-button variant="tinted">Label</button>
                            <button cup-button variant="tinted" role="destructive">Label</button>
                            <button cup-button variant="filled" role="destructive">Label</button>
                            <button cup-button variant="plain">Label</button>
                            <button cup-button variant="plain" role="destructive">Label</button>

                            <div class="sb-matrix-rowlabel">Icon</div>
                            <button cup-button variant="gray" icon="heart.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" icon="arrow.right" iconPosition="end">Label</button>
                            <button cup-button variant="tinted" icon="play.fill" iconPosition="start">Label</button>
                            <button cup-button variant="tinted" role="destructive" icon="trash.fill" iconPosition="start">Label</button>
                            <button cup-button variant="filled" role="destructive" icon="trash.fill" iconPosition="start">Label</button>
                            <button cup-button variant="plain" icon="chevron.right" iconPosition="end">Label</button>
                            <button cup-button variant="plain" role="destructive" icon="trash.fill" iconPosition="start">Label</button>

                            <div class="sb-matrix-rowlabel">Disabled</div>
                            <button cup-button variant="gray" [disabled]="true">Label</button>
                            <button cup-button variant="filled" [disabled]="true">Label</button>
                            <button cup-button variant="tinted" [disabled]="true">Label</button>
                            <button cup-button variant="tinted" role="destructive" [disabled]="true">Label</button>
                            <button cup-button variant="filled" role="destructive" [disabled]="true">Label</button>
                            <button cup-button variant="plain" [disabled]="true">Label</button>
                            <button cup-button variant="plain" role="destructive" [disabled]="true">Label</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};

/** macOS desktop matrix — rounded, compact (sm), with the macOS style names, for 1:1 comparison with the macOS Figma. */
export const MacOSMatrix: Story = {
    name: "macOS Push Buttons",
    render: () => ({
        template: `
            ${demoStyles}
            ${matrixStyles}
            <div class="sb-demo">
                <section class="sb-surface">
                    <div class="sb-header">
                        <h3 class="sb-title">macOS Push Buttons</h3>
                        <p class="sb-caption">Rounded, compact desktop push buttons with the macOS style names. Default is the neutral bordered button; Primary is the preferred (default) action.</p>
                    </div>
                    <div class="sb-matrix-scroll">
                        <div class="sb-matrix">
                            <div></div>
                            <div class="sb-matrix-col">Default</div>
                            <div class="sb-matrix-col">Colored</div>
                            <div class="sb-matrix-col">Secondary</div>
                            <div class="sb-matrix-col">Destructive</div>
                            <div class="sb-matrix-col">Primary</div>
                            <div class="sb-matrix-col">Borderless</div>
                            <div class="sb-matrix-col">Borderless +</div>

                            <div class="sb-matrix-rowlabel">Idle</div>
                            <button cup-button variant="bordered" size="sm" shape="rounded">Label</button>
                            <button cup-button variant="filled" size="sm" shape="rounded">Label</button>
                            <button cup-button variant="tinted" size="sm" shape="rounded">Label</button>
                            <button cup-button variant="tinted" size="sm" shape="rounded" role="destructive">Label</button>
                            <button cup-button variant="filled" size="sm" shape="rounded" preferred>Label</button>
                            <button cup-button variant="plain" size="sm">Label</button>
                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start">Label</button>

                            <div class="sb-matrix-rowlabel">Disabled</div>
                            <button cup-button variant="bordered" size="sm" shape="rounded" [disabled]="true">Label</button>
                            <button cup-button variant="filled" size="sm" shape="rounded" [disabled]="true">Label</button>
                            <button cup-button variant="tinted" size="sm" shape="rounded" [disabled]="true">Label</button>
                            <button cup-button variant="tinted" size="sm" shape="rounded" role="destructive" [disabled]="true">Label</button>
                            <button cup-button variant="filled" size="sm" shape="rounded" preferred [disabled]="true">Label</button>
                            <button cup-button variant="plain" size="sm" [disabled]="true">Label</button>
                            <button cup-button variant="plain" size="sm" icon="heart" iconPosition="start" [disabled]="true">Label</button>
                        </div>
                    </div>
                </section>
            </div>
        `,
    }),
};
