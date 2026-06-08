import { Component, computed } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CupSlider } from "@ngx-cupertino/ui";

@Component({
    imports: [CupSlider, ReactiveFormsModule],
    template: `
        <div class="playground-section">
        <h2>Slider</h2>

        <!-- ─── Basic ─── -->
        <h3>Basic</h3>
        <div class="demo-column">
            <cup-slider [(value)]="volume" label="Volume" />
            <cup-slider [(value)]="brightness" label="Brightness" showValue />
            <cup-slider [(value)]="opacity" label="Opacity"
                        min="0" max="1" step="0.01" showValue />
        </div>

        <!-- ─── With Ticks ─── -->
        <h3>With Ticks</h3>
        <div class="demo-column">
            <cup-slider [(value)]="speed" label="Speed"
                        min="1" max="5" step="1" ticks="5" showValue />
            <cup-slider [(value)]="rating" label="Rating"
                        min="0" max="10" step="1" ticks="11" showValue />
            <cup-slider [(value)]="quality" label="Quality"
                        min="1" max="3" step="1" ticks="3" />
        </div>

        <!-- ─── Min/Max Icons ─── -->
        <h3>Min/Max Icons</h3>
        <div class="demo-column">
            <cup-slider [(value)]="brightness2"
                        minIcon="sun.min" maxIcon="sun.max" />
            <cup-slider [(value)]="volume2"
                        minIcon="speaker" maxIcon="speaker.wave.3"
                        showValue />
            <cup-slider [(value)]="speed2" min="1" max="5" step="1"
                        ticks="5"
                        minIcon="minus" maxIcon="plus" />
        </div>

        <!-- ─── With Label + Value ─── -->
        <h3>Label + Value Display</h3>
        <div class="demo-column">
            <cup-slider [(value)]="temperature" label="Temperature"
                        min="16" max="32" step="0.5" showValue />
            <cup-slider [(value)]="fontSize" label="Font Size"
                        min="12" max="48" step="1" showValue />
            <cup-slider [(value)]="zoom" label="Zoom"
                        min="50" max="200" step="10" showValue />
        </div>

        <!-- ─── Disabled ─── -->
        <h3>Disabled</h3>
        <div class="demo-column">
            <cup-slider [value]="50" label="Locked" disabled />
            <cup-slider [value]="75" disabled
                        minIcon="speaker" maxIcon="speaker.wave.3" />
            <cup-slider [value]="3" min="1" max="5" step="1"
                        ticks="5" disabled label="Fixed Speed" />
        </div>

        <!-- ─── Without Label (aria-label) ─── -->
        <h3>Without Label</h3>
        <div class="demo-column">
            <cup-slider [(value)]="hiddenSlider1"
                        ariaLabel="Background opacity" />
            <cup-slider [(value)]="hiddenSlider2"
                        ariaLabel="Playback speed"
                        min="0.5" max="2" step="0.25" showValue />
        </div>

        <!-- ─── Reactive Forms ─── -->
        <h3>Reactive Forms</h3>
        <form [formGroup]="sliderForm">
            <div class="demo-column">
            <cup-slider formControlName="volume"
                        label="Volume" showValue
                        minIcon="speaker" maxIcon="speaker.wave.3" />
            <cup-slider formControlName="bass"
                        label="Bass" showValue
                        min="-12" max="12" step="1" />
            <cup-slider formControlName="treble"
                        label="Treble" showValue
                        min="-12" max="12" step="1" />
            </div>
            <p>Form value: {{ sliderFormValue() }}</p>
        </form>

        <!-- ─── Custom Ranges ─── -->
        <h3>Custom Ranges</h3>
        <div class="demo-column">
            <cup-slider [(value)]="year" label="Year"
                        min="2000" max="2026" step="1" showValue />
            <cup-slider [(value)]="percentage" label="Completion"
                        min="0" max="100" step="5" ticks="21" showValue />
            <cup-slider [(value)]="price" label="Max Price"
                        min="0" max="1000" step="50" showValue />
        </div>

        <!-- ─── Events ─── -->
        <h3>Events (slideStart / slideEnd)</h3>
        <div class="demo-column">
            <cup-slider [(value)]="seekValue" label="Seek"
                        min="0" max="100"
                        (slideStart)="onSlideStart()"
                        (slideEnd)="onSlideEnd()"
                        showValue />
            <p class="demo-output">
            Status: {{ seekStatus }}
            </p>
        </div>

        <!-- ─── Ticks + Icons Combined ─── -->
        <h3>Full Featured</h3>
        <div class="demo-column">
            <cup-slider [(value)]="fullSpeed" label="Playback Speed"
                        min="1" max="5" step="1" ticks="5"
                        minIcon="minus" maxIcon="plus"
                        showValue />
            <cup-slider [(value)]="fullBrightness" label="Display Brightness"
                        min="0" max="100" step="10" ticks="11"
                        minIcon="sun.min" maxIcon="sun.max"
                        showValue />
        </div>
        </div>

    `,
})
export class SliderPage {
    // Basic
    volume = 50;
    brightness = 75;
    opacity = 0.5;

    // Ticks
    speed = 3;
    rating = 7;
    quality = 2;

    // Min/Max Icons
    brightness2 = 60;
    volume2 = 40;
    speed2 = 3;

    // Label + Value
    temperature = 22;
    fontSize = 17;
    zoom = 100;

    // Without Label
    hiddenSlider1 = 50;
    hiddenSlider2 = 1;

    // Custom Ranges
    year = 2024;
    percentage = 65;
    price = 500;

    // Events
    seekValue = 30;
    seekStatus = "Idle";

    onSlideStart(): void {
        this.seekStatus = "Seeking...";
    }

    onSlideEnd(): void {
        this.seekStatus = `Seeked to ${this.seekValue}`;
    }

    sliderFormValue = computed(() => JSON.stringify(this.sliderForm.value));

    // Full Featured
    fullSpeed = 3;
    fullBrightness = 70;

    // Reactive Form
    sliderForm = new FormGroup({
        volume: new FormControl(50),
        bass: new FormControl(0),
        treble: new FormControl(0),
    });
}
