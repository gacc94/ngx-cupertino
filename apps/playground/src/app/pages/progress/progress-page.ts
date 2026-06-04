import { Component, signal } from "@angular/core";
import { CupProgress } from "@ngx-cupertino/ui";

@Component({
    imports: [CupProgress],
    template: `
        <h1>Progress</h1>
        <h2>Linear</h2>
        <div style="width: 400px">
            <cup-progress [value]="upload()" label="Uploading" />
        </div>
        <h2>Circular</h2>
        <div class="demo-row">
            <cup-progress type="circular" [value]="download()" label="Downloading" />
        </div>
    `,
})
export class ProgressPage {
    readonly upload = signal(65);
    readonly download = signal(40);
}
