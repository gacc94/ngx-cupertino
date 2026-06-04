import { ChangeDetectionStrategy, Component, computed, input, model, output } from "@angular/core";
import { CupFormControl } from "@ngx-cupertino/core";

@Component({
    selector: "cup-slider",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class.cup-disabled]": "disabled()",
    },
    template: `
        <div class="cup-slider-container">
            @if (label()) {
                <label class="cup-slider-label">{{ label() }}</label>
            }
            <div class="cup-slider-track"
                 #track
                 (mousedown)="onTrackMouseDown($event)">
                <div class="cup-slider-fill" [style.width.%]="percentage()"></div>
                <div class="cup-slider-thumb"
                     [style.left.%]="percentage()"
                     (mousedown)="onThumbMouseDown($event)"
                     role="slider"
                     [attr.aria-valuemin]="min()"
                     [attr.aria-valuemax]="max()"
                     [attr.aria-valuenow]="value()"
                     [attr.aria-disabled]="disabled() ? true : null"
                     [attr.aria-label]="label()"
                     tabindex="0"
                     (keydown)="onKeyDown($event)">
                </div>
            </div>
            <input type="range"
                   [min]="min()"
                   [max]="max()"
                   [step]="step()"
                   [value]="value()"
                   (input)="onNativeInput($event)"
                   class="cup-slider-native" />
        </div>
    `,
    styleUrl: "./cup-slider.scss",
})
export class CupSlider extends CupFormControl<number> {
    override readonly value = model(0);
    readonly min = input(0);
    readonly max = input(100);
    readonly step = input(1);
    readonly label = input<string>();
    readonly slideStart = output<void>();
    readonly slideEnd = output<void>();

    readonly percentage = computed(() => {
        const range = this.max() - this.min();
        if (range === 0) return 0;
        return ((this.value() - this.min()) / range) * 100;
    });

    private dragging = false;

    onNativeInput(event: Event): void {
        const val = Number((event.target as HTMLInputElement).value);
        this.setValue(val);
    }

    onTrackMouseDown(event: MouseEvent): void {
        if (this.disabled()) return;
        const track = event.currentTarget as HTMLElement;
        const rect = track.getBoundingClientRect();
        const percent = (event.clientX - rect.left) / rect.width;
        const val = this.min() + percent * (this.max() - this.min());
        this.setValue(this.snapToStep(val));
        this.slideStart.emit();
    }

    onThumbMouseDown(event: MouseEvent): void {
        if (this.disabled()) return;
        event.preventDefault();
        this.dragging = true;
        this.slideStart.emit();

        const onMouseMove = (e: MouseEvent) => {
            if (!this.dragging) return;
            const thumb = event.target as HTMLElement;
            const trackEl = thumb.parentElement;
            if (!trackEl) return;
            const rect = trackEl.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const val = this.min() + percent * (this.max() - this.min());
            this.setValue(this.snapToStep(val));
        };

        const onMouseUp = () => {
            this.dragging = false;
            this.slideEnd.emit();
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this.disabled()) return;
        const s = this.step();
        switch (event.key) {
            case "ArrowRight":
            case "ArrowUp":
                event.preventDefault();
                this.setValue(this.snapToStep(this.value() + s));
                break;
            case "ArrowLeft":
            case "ArrowDown":
                event.preventDefault();
                this.setValue(this.snapToStep(this.value() - s));
                break;
            case "Home":
                event.preventDefault();
                this.setValue(this.min());
                break;
            case "End":
                event.preventDefault();
                this.setValue(this.max());
                break;
        }
    }

    private setValue(v: number): void {
        const clamped = Math.max(this.min(), Math.min(this.max(), v));
        this.value.set(clamped);
        this.onChange(clamped);
    }

    private snapToStep(v: number): number {
        const s = this.step();
        return Math.round(v / s) * s;
    }

    override writeValue(v: number): void {
        this.value.set(v ?? this.min());
    }
}
