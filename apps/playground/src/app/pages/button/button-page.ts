import { Component } from "@angular/core";
import { CupButton } from "@ngx-cupertino/ui";

@Component({
    imports: [CupButton],
    template: `
        <h1>Button</h1>
        <!-- ═══════════════════════════════════ -->
        <!-- VARIANTS (5) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Variants</h2>
        <button cup-button variant="filled">Filled</button>
        <button cup-button variant="tinted">Tinted</button>
        <button cup-button variant="gray">Gray</button>
        <button cup-button variant="plain">Plain</button>
        <button cup-button variant="liquid-glass">Liquid Glass</button>

        <!-- ═══════════════════════════════════ -->
        <!-- SIZES (3 × filled example) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Sizes</h2>
        <button cup-button variant="filled" size="sm">Small</button>
        <button cup-button variant="filled">Medium</button>
        <button cup-button variant="filled" size="lg">Large</button>

        <!-- ═══════════════════════════════════ -->
        <!-- DESTRUCTIVE × VARIANTS (4) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Destructive</h2>
        <button cup-button variant="filled" destructive>Delete</button>
        <button cup-button variant="tinted" destructive>Remove</button>
        <button cup-button variant="gray" destructive>Discard</button>
        <button cup-button variant="plain" destructive>Cancel</button>

        <!-- ═══════════════════════════════════ -->
        <!-- STATES (3) -->
        <!-- ═══════════════════════════════════ -->
        <h2>States</h2>
        <button cup-button variant="filled" disabled>Disabled</button>
        <button cup-button variant="filled" loading>Loading</button>
        <button cup-button variant="tinted" disabled>Disabled Tinted</button>

        <!-- ═══════════════════════════════════ -->
        <!-- ICONS — LEADING (start) -->
        <!-- ═══════════════════════════════════ -->
        <h2>With Icon (Leading)</h2>
        <button cup-button variant="filled" icon="plus">Add Item</button>
        <button cup-button variant="tinted" icon="heart">Like</button>
        <button cup-button variant="gray" icon="star">Favorite</button>
        <button cup-button variant="plain" icon="arrow-right">Next</button>

        <!-- ═══════════════════════════════════ -->
        <!-- ICONS — TRAILING (end) -->
        <!-- ═══════════════════════════════════ -->
        <h2>With Icon (Trailing)</h2>
        <button cup-button variant="filled" icon="arrow-right" iconPosition="end">Continue</button>
        <button cup-button variant="tinted" icon="share" iconPosition="end">Share</button>
        <button cup-button variant="gray" icon="chevron-down" iconPosition="end">More</button>

        <!-- ═══════════════════════════════════ -->
        <!-- ICON-ONLY (must have aria-label) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Icon Only</h2>
        <button cup-button variant="plain" icon="x" aria-label="Close"></button>
        <button cup-button variant="plain" icon="search" aria-label="Search"></button>
        <button cup-button variant="plain" icon="settings" aria-label="Settings"></button>
        <button cup-button variant="liquid-glass" icon="plus" aria-label="Add"></button>

        <!-- ═══════════════════════════════════ -->
        <!-- FULL WIDTH -->
        <!-- ═══════════════════════════════════ -->
        <h2>Full Width</h2>
        <button cup-button variant="filled" fullWidth>Continue</button>
        <button cup-button variant="tinted" fullWidth>Sign Up</button>
        <button cup-button variant="gray" fullWidth>Cancel</button>

        <!-- ═══════════════════════════════════ -->
        <!-- LINK AS BUTTON (a[cup-button]) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Link as Button</h2>
        <a cup-button variant="filled" href="/pricing">View Plans</a>
        <a cup-button variant="tinted" routerLink="/settings">Settings</a>
        <a cup-button variant="plain" href="https://apple.com" target="_blank">Apple.com</a>

        <!-- ═══════════════════════════════════ -->
        <!-- SIZES × VARIANTS (matrix) -->
        <!-- ═══════════════════════════════════ -->
        <h2>Size × Variant Matrix</h2>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button cup-button variant="filled" size="sm">Filled SM</button>
        <button cup-button variant="tinted" size="sm">Tinted SM</button>
        <button cup-button variant="gray" size="sm">Gray SM</button>
        <button cup-button variant="plain" size="sm">Plain SM</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button cup-button variant="filled">Filled MD</button>
        <button cup-button variant="tinted">Tinted MD</button>
        <button cup-button variant="gray">Gray MD</button>
        <button cup-button variant="plain">Plain MD</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button cup-button variant="filled" size="lg">Filled LG</button>
        <button cup-button variant="tinted" size="lg">Tinted LG</button>
        <button cup-button variant="gray" size="lg">Gray LG</button>
        <button cup-button variant="plain" size="lg">Plain LG</button>
        </div>

        <!-- ═══════════════════════════════════ -->
        <!-- LOADING × VARIANTS -->
        <!-- ═══════════════════════════════════ -->
        <h2>Loading States</h2>
        <button cup-button variant="filled" loading>Saving...</button>
        <button cup-button variant="tinted" loading>Uploading...</button>
        <button cup-button variant="gray" loading>Processing...</button>
        <button cup-button variant="liquid-glass" loading>Syncing...</button>

        <!-- ═══════════════════════════════════ -->
        <!-- DESTRUCTIVE + ICON -->
        <!-- ═══════════════════════════════════ -->
        <h2>Destructive with Icon</h2>
        <button cup-button variant="filled" destructive icon="trash">Delete All</button>
        <button cup-button variant="tinted" destructive icon="minus-circle">Remove</button>
        <button cup-button variant="plain" destructive icon="x">Cancel</button>

    `,
})
export class ButtonPage {}
