// Shared Storybook demo chrome for cup-toggle stories. All values come from design-system
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
            gap: var(--cup-space-5);
            align-items: center;
        }

        .sb-rowlabel {
            min-inline-size: 96px;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-caption1);
            font-weight: var(--cup-weight-semibold);
        }

        /* iOS Settings-style list: a label on the left, the switch pinned right. */
        .sb-list {
            display: grid;
            gap: 0;
            border-radius: var(--cup-radius-card);
            background: var(--cup-bg);
            border: var(--cup-border-hairline) solid var(--cup-separator);
            overflow: hidden;
            max-inline-size: 420px;
        }

        .sb-list-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--cup-space-4);
            padding: var(--cup-space-3) var(--cup-space-4);
        }

        .sb-list-row + .sb-list-row {
            border-block-start: var(--cup-border-hairline) solid var(--cup-separator);
        }

        .sb-list-label {
            color: var(--cup-label);
            font-family: var(--cup-font-sans);
            font-size: var(--cup-text-body);
        }

        .sb-form {
            display: grid;
            gap: var(--cup-space-3);
            max-inline-size: 420px;
        }

        .sb-form-readout {
            margin: 0;
            color: var(--cup-label-secondary);
            font-family: var(--cup-font-mono, monospace);
            font-size: var(--cup-text-caption1);
        }
    </style>
`;
