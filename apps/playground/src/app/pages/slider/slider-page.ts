import { Component, signal } from "@angular/core";
import { CupSlider } from "@ngx-cupertino/ui";

@Component({
    imports: [CupSlider],
    template: `
        <h1>Slider</h1>
        <div class="demo-section">
            <h2>Default</h2>
            <div style="width: 320px">
                <cup-slider [(value)]="volume" label="Volume" />
            </div>
        </div>
        <div class="demo-section">
            <h2>Custom Range</h2>
            <div style="width: 320px">
                <cup-slider [(value)]="brightness" [min]="0" [max]="100" [step]="5" label="Brightness" />
            </div>
        </div>
    `,
})
export class SliderPage {
    readonly volume = signal(50);
    readonly brightness = signal(75);
}
