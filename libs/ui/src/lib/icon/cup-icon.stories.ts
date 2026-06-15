import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { CupIcon, SF_SYMBOL_MAP } from "@ngx-cupertino/icons";
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";

// All icons are registered globally via provideCupIcons() in .storybook/preview.ts (R1),
// so the gallery does not need to provide them itself.

// Base SF Symbol names only — the `.fill` keys are duplicates handled by the Filled toggle (R2).
const BASE_ICON_NAMES = Object.keys(SF_SYMBOL_MAP)
    .filter((name) => !name.endsWith(".fill"))
    .sort();

/**
 * Searchable icon gallery (ionicons-style): search box, Regular/Filled toggle, and a responsive
 * grid of every design-system icon with its name. Click an icon to copy its name.
 */
@Component({
    selector: "sb-icon-gallery",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    template: `
        <div class="gallery">
            <div class="toolbar">
                <input
                    class="search"
                    type="search"
                    placeholder="Search icons…"
                    [value]="query()"
                    (input)="onSearch($event)"
                    aria-label="Search icons"
                />
                <div class="modes" role="group" aria-label="Icon style">
                    <button type="button" class="mode" [class.active]="!filled()" (click)="filled.set(false)">Regular</button>
                    <button type="button" class="mode" [class.active]="filled()" (click)="filled.set(true)">Filled</button>
                </div>
            </div>

            <p class="count">{{ filtered().length }} of {{ total }} icons</p>
            <p class="hint">Filled paints the outline with currentColor; Lucide has no native filled variants, so cut-out icons (bell, house) may look heavy.</p>

            @if (filtered().length === 0) {
                <p class="empty">No icons found for “{{ query() }}”.</p>
            } @else {
                <div class="grid">
                    @for (name of filtered(); track name) {
                        <button type="button" class="cell" [attr.aria-label]="'Copy ' + name" (click)="copy(name)">
                            <cup-icon [name]="name" [fill]="filled()" size="lg" />
                            <span class="label">{{ copied() === name ? 'Copied!' : name }}</span>
                        </button>
                    }
                </div>
            }
        </div>
    `,
    styles: [
        `
        :host { display: block; }

        .gallery {
            display: grid;
            gap: var(--cup-space-4);
            padding: var(--cup-space-6);
            max-inline-size: 1080px;
            font-family: var(--cup-font-sans);
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: var(--cup-space-3);
            align-items: center;
        }

        .search {
            flex: 1 1 240px;
            min-inline-size: 200px;
            block-size: var(--cup-control-height);
            padding-inline: var(--cup-space-4);
            border-radius: var(--cup-radius-input);
            border: var(--cup-border-thin) solid var(--cup-separator);
            background: var(--cup-bg);
            color: var(--cup-label);
            font-family: inherit;
            font-size: var(--cup-text-subheadline);
        }

        .search:focus-visible {
            outline: var(--cup-border-focus) solid var(--cup-focus-ring);
            outline-offset: 2px;
        }

        .modes {
            display: inline-flex;
            gap: var(--cup-space-1);
            padding: var(--cup-space-1);
            border-radius: var(--cup-radius-input);
            background: var(--cup-fill-secondary);
        }

        .mode {
            appearance: none;
            border: 0;
            background: transparent;
            color: var(--cup-label-secondary);
            font-family: inherit;
            font-size: var(--cup-text-caption1);
            font-weight: var(--cup-weight-semibold);
            padding: var(--cup-space-1) var(--cup-space-3);
            border-radius: var(--cup-radius-button-sm);
            cursor: pointer;
        }

        .mode.active {
            background: var(--cup-bg);
            color: var(--cup-label);
        }

        .count {
            margin: 0;
            color: var(--cup-label-secondary);
            font-size: var(--cup-text-caption1);
            font-weight: var(--cup-weight-semibold);
        }

        .hint, .empty {
            margin: 0;
            color: var(--cup-label-secondary);
            font-size: var(--cup-text-caption1);
            line-height: var(--cup-leading-normal);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
            gap: var(--cup-space-4);
        }

        .cell {
            display: grid;
            justify-items: center;
            gap: var(--cup-space-2);
            padding: var(--cup-space-3);
            border-radius: var(--cup-radius-card);
            border: var(--cup-border-hairline) solid var(--cup-separator);
            background: var(--cup-bg);
            color: var(--cup-label);
            font-family: inherit;
            cursor: pointer;
            transition: background var(--cup-duration-fast) var(--cup-ease-default);
        }

        .cell:hover {
            background: var(--cup-fill-quaternary);
        }

        .cell:focus-visible {
            outline: var(--cup-border-focus) solid var(--cup-focus-ring);
            outline-offset: 2px;
        }

        .label {
            inline-size: 100%;
            color: var(--cup-label-secondary);
            font-size: var(--cup-text-caption2);
            line-height: var(--cup-leading-normal);
            text-align: center;
            overflow-wrap: anywhere;
        }
        `,
    ],
})
class IconGallery {
    readonly query = signal("");
    readonly filled = signal(false);
    readonly copied = signal<string | null>(null);

    readonly total = BASE_ICON_NAMES.length;

    readonly filtered = computed(() => {
        const q = this.query().trim().toLowerCase();
        return q ? BASE_ICON_NAMES.filter((name) => name.toLowerCase().includes(q)) : BASE_ICON_NAMES;
    });

    onSearch(event: Event): void {
        this.query.set((event.target as HTMLInputElement).value);
    }

    copy(name: string): void {
        void navigator.clipboard?.writeText(name);
        this.copied.set(name);
        setTimeout(() => this.copied.set(null), 1000);
    }
}

type IconArgs = {
    name: string;
    size: "sm" | "md" | "lg" | number;
    fill: boolean;
    color: string;
    strokeWidth: number;
    ariaLabel?: string;
};

const meta: Meta<IconGallery> = {
    title: "Foundations / Icon",
    decorators: [moduleMetadata({ imports: [IconGallery, CupIcon] })],
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<IconGallery>;

/** Searchable grid of every design-system icon (ionicons-style). Click an icon to copy its name. */
export const Gallery: Story = {
    render: () => ({ template: `<sb-icon-gallery />` }),
};

/** A single cup-icon with interactive controls. */
export const Playground: StoryObj<IconArgs> = {
    args: {
        name: "star.fill",
        size: "lg",
        fill: false,
        color: "currentColor",
        strokeWidth: 1.75,
        ariaLabel: undefined,
    },
    argTypes: {
        name: { control: "select", options: Object.keys(SF_SYMBOL_MAP) },
        size: { control: "select", options: ["sm", "md", "lg", 16, 24, 32, 48] },
        fill: { control: "boolean" },
        color: { control: "text" },
        strokeWidth: { control: { type: "number", min: 0.5, max: 3, step: 0.25 } },
        ariaLabel: { control: "text" },
    },
    render: (args) => ({
        props: args,
        template: `
            <div style="display:flex; align-items:center; justify-content:center; padding:48px;">
                <cup-icon
                    [name]="name"
                    [size]="size"
                    [fill]="fill"
                    [color]="color"
                    [strokeWidth]="strokeWidth"
                    [ariaLabel]="ariaLabel"
                />
            </div>
        `,
    }),
};
