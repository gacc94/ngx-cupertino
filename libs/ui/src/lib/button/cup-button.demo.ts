// Shared Storybook demo chrome for cup-button stories. All values come from design-system
// tokens (CSS custom properties) — no hardcoded colors, spacing, radii or fonts.

export const demoStyles = `
    <style>
        .sb-demo {
            display: grid;
            gap: var(--cup-space-6);
            max-inline-size: 1080px;
        }

        .sb-surface {
            display: grid;
            gap: var(--cup-space-5);
            padding: var(--cup-space-6);
            border-radius: var(--cup-radius-card);
            background: var(--cup-bg-grouped-secondary);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-header {
            display: grid;
            gap: var(--cup-space-1);
        }

        .sb-title {
            margin: 0;
            color: var(--cup-label);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-title2);
            font-weight: var(--cup-weight-semibold);
            line-height: var(--cup-leading-tight);
        }

        .sb-caption {
            margin: 0;
            max-inline-size: 720px;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-subheadline);
            line-height: var(--cup-leading-normal);
        }

        .sb-stack {
            display: grid;
            gap: var(--cup-space-4);
        }

        .sb-row {
            display: flex;
            flex-wrap: wrap;
            gap: var(--cup-space-3);
            align-items: center;
        }

        .sb-rowlabel {
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-caption1);
            font-weight: var(--cup-weight-semibold);
        }

        .sb-grid {
            display: grid;
            gap: var(--cup-space-4);
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .sb-panel {
            display: grid;
            gap: var(--cup-space-4);
            padding: var(--cup-space-4);
            border-radius: var(--cup-radius-card);
            background: var(--cup-bg);
            border: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-panel-title {
            margin: 0;
            color: var(--cup-label);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-subheadline);
            font-weight: var(--cup-weight-semibold);
        }

        .sb-panel--grouped {
            background: var(--cup-bg-grouped);
        }

        .sb-panel--media {
            background: linear-gradient(135deg, var(--cup-tint-subtle), var(--cup-tint-container));
        }

        .sb-panel--chrome {
            background: var(--cup-material-chrome);
        }
    </style>
`;
