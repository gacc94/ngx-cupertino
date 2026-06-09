import { Component } from "@angular/core";
import { CupProgress } from "@ngx-cupertino/ui";

@Component({
    imports: [CupProgress],
    template: `
        <div class="playground-section">
            <h2>Progress</h2>

            <!-- ─── Linear Determinate ─── -->
            <h3>Linear Determinate</h3>
            <div class="demo-column">
                <cup-progress [value]="0" label="Not started" showPercentage />
                <cup-progress [value]="25" label="Downloading..." showPercentage />
                <cup-progress [value]="50" label="Processing..." showPercentage />
                <cup-progress [value]="75" label="Almost done..." showPercentage />
                <cup-progress [value]="100" label="Complete" showPercentage />
            </div>

            <!-- ─── Linear Indeterminate ─── -->
            <h3>Linear Indeterminate</h3>
            <div class="demo-column">
                <cup-progress indeterminate label="Loading..." />
                <cup-progress indeterminate label="Connecting to server..." />
                <cup-progress indeterminate />
            </div>

            <!-- ─── Linear Sizes ─── -->
            <h3>Linear Sizes</h3>
            <div class="demo-column">
                <cup-progress [value]="65" size="sm" label="Thin (sm)" showPercentage />
                <cup-progress [value]="65" label="Default (md)" showPercentage />
                <cup-progress [value]="65" size="lg" label="Large (lg)" showPercentage />
            </div>

            <!-- ─── Linear Dynamic ─── -->
            <h3>Linear Dynamic</h3>
            <div class="demo-column">
                <cup-progress [value]="dynamicValue" label="Upload progress" showPercentage />
                <div class="demo-row">
                <button cup-button variant="tinted" size="sm" (clicked)="decreaseProgress()">-10</button>
                <button cup-button variant="tinted" size="sm" (clicked)="increaseProgress()">+10</button>
                <button cup-button variant="plain" size="sm" (clicked)="resetProgress()">Reset</button>
                </div>
            </div>

            <!-- Si usas cup-button -->
            <button cup-button variant="tinted" size="sm" (clicked)="decreaseProgress()">-10</button>

            <!-- Si usas button nativo -->
            <button (click)="decreaseProgress()">-10</button>

            <!-- ─── Circular Determinate ─── -->
            <h3>Circular Determinate</h3>
            <div class="demo-row">
                <cup-progress type="circular" [value]="0" />
                <cup-progress type="circular" [value]="25" />
                <cup-progress type="circular" [value]="50" />
                <cup-progress type="circular" [value]="75" />
                <cup-progress type="circular" [value]="100" />
            </div>

            <!-- ─── Circular Sizes ─── -->
            <h3>Circular Sizes</h3>
            <div class="demo-row">
                <cup-progress type="circular" [value]="65" size="sm" />
                <cup-progress type="circular" [value]="65" />
                <cup-progress type="circular" [value]="65" size="lg" />
            </div>

            <!-- ─── Circular with Label ─── -->
            <h3>Circular with Label</h3>
            <div class="demo-row">
                <cup-progress type="circular" [value]="72" label="Storage" />
                <cup-progress type="circular" [value]="45" label="Battery" />
                <cup-progress type="circular" [value]="90" label="Memory" />
            </div>

            <!-- ─── Spinner ─── -->
            <h3>Spinner</h3>
            <div class="demo-row">
                <cup-progress type="spinner" size="sm" />
                <cup-progress type="spinner" />
                <cup-progress type="spinner" size="lg" />
            </div>

            <!-- ─── Spinner with Context ─── -->
            <h3>Spinner with Context</h3>
            <div class="demo-column">
                <div class="demo-row" style="align-items: center; gap: 12px;">
                <cup-progress type="spinner" size="sm" />
                <span>Loading messages...</span>
                </div>
                <div class="demo-row" style="align-items: center; gap: 12px;">
                <cup-progress type="spinner" size="sm" />
                <span>Syncing data...</span>
                </div>
            </div>

            <!-- ─── Without Label (aria-label only) ─── -->
            <h3>Without Label</h3>
            <div class="demo-column">
                <cup-progress [value]="40" ariaLabel="File upload" />
                <cup-progress type="circular" [value]="60" ariaLabel="Disk usage" />
                <cup-progress type="spinner" ariaLabel="Loading content" />
            </div>

            <!-- ─── Custom Max ─── -->
            <h3>Custom Max</h3>
            <div class="demo-column">
                <cup-progress [value]="3" [max]="10" label="Steps completed" showPercentage />
                <cup-progress [value]="750" [max]="1000" label="Points earned" showPercentage />
            </div>

            <!-- ─── All Types Side by Side ─── -->
            <h3>All Types Comparison</h3>
            <div class="demo-row" style="align-items: center; gap: 24px;">
                <div style="flex: 1;">
                <cup-progress [value]="65" label="Linear" showPercentage />
                </div>
                <cup-progress type="circular" [value]="65" />
                <cup-progress type="spinner" />
            </div>
        </div>
    `,
})
export class ProgressPage {
    dynamicValue = 0;

    increaseProgress(): void {
        this.dynamicValue = Math.min(100, this.dynamicValue + 10);
    }

    decreaseProgress(): void {
        this.dynamicValue = Math.max(0, this.dynamicValue - 10);
    }

    resetProgress(): void {
        this.dynamicValue = 0;
    }
}
