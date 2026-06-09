import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    forwardRef,
    inject,
    input,
    model,
    numberAttribute,
    output,
    signal,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CupFormControl } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

let nextId = 0;

@Component({
    selector: "cup-slider",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CupSlider),
            multi: true,
        },
    ],
    host: {
        "[class.disabled]": "disabled()",
        "[class.dragging]": "dragging()",
    },
    template: `
        @if (label() || showValue()) {
            <div class="header">
                @if (label()) {
                    <label class="label" [attr.for]="sliderId">{{ label() }}</label>
                }
                @if (showValue()) {
                    <span class="value">{{ displayValue() }}</span>
                }
            </div>
        }
        <div class="slider-row">
            @if (minIcon()) {
                <cup-icon [name]="minIcon()!" class="min-icon" size="sm" />
            }
            <div class="track-container" (pointerdown)="onPointerDown($event)">
                <div class="track">
                    <div class="fill" [style.width.%]="percentage()"></div>
                    <div class="thumb"
                         [style.left.%]="percentage()"
                         role="slider"
                         [attr.aria-valuemin]="min()"
                         [attr.aria-valuemax]="max()"
                         [attr.aria-valuenow]="value()"
                         [attr.aria-valuetext]="ariaValueText() || null"
                         [attr.aria-disabled]="disabled() ? true : null"
                         [attr.aria-label]="ariaLabel() || label() || null"
                         [tabindex]="disabled() ? -1 : 0"
                         (keydown)="onKeyDown($event)">
                    </div>
                </div>
                @if (ticks() > 0) {
                    <div class="ticks">
                        @for (tick of tickPositions(); track tick) {
                            <span class="tick" [style.left.%]="tick"></span>
                        }
                    </div>
                }
            </div>
            @if (maxIcon()) {
                <cup-icon [name]="maxIcon()!" class="max-icon" size="sm" />
            }
        </div>
        <input type="range"
               [id]="sliderId"
               [min]="min()"
               [max]="max()"
               [step]="step()"
               [value]="value()"
               [disabled]="disabled()"
               [attr.name]="name() || null"
               (input)="onNativeInput($event)"
                class="native" />
    `,
    styleUrl: "./cup-slider.scss",
})
export class CupSlider extends CupFormControl<number> {
    private readonly destroyRef = inject(DestroyRef);
    private abortController: AbortController | null = null;

    constructor() {
        super();
        this.destroyRef.onDestroy(() => this.abortController?.abort());
    }

    override readonly value = model(0);
    readonly min = input(0, { transform: numberAttribute });
    readonly max = input(100, { transform: numberAttribute });
    readonly step = input(1, { transform: numberAttribute });
    readonly ticks = input(0, { transform: numberAttribute });
    readonly label = input<string>();
    readonly showValue = input(false, { transform: booleanAttribute });
    readonly minIcon = input<string>();
    readonly maxIcon = input<string>();
    readonly ariaLabel = input<string>();
    readonly ariaValueText = input<string>();
    readonly name = input<string>();

    readonly slideStart = output<void>();
    readonly slideEnd = output<void>();

    protected readonly dragging = signal(false);
    protected readonly sliderId = `cup-slider-${nextId++}`;

    readonly percentage = computed(() => {
        const range = this.max() - this.min();
        if (range === 0) return 0;
        return ((this.value() - this.min()) / range) * 100;
    });

    readonly tickPositions = computed(() => {
        const count = this.ticks();
        if (count < 2) return [];
        return Array.from({ length: count }, (_, i) => (i / (count - 1)) * 100);
    });

    protected readonly displayValue = computed(() => {
        const v = this.value();
        const s = this.step();
        const decimals = (s.toString().split(".")[1] || "").length;
        return Number(v.toFixed(decimals));
    });

    protected onPointerDown(event: PointerEvent): void {
        if (this.disabled()) return;
        event.preventDefault();

        const container = event.currentTarget as HTMLElement;
        container.setPointerCapture(event.pointerId);

        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;

        this.dragging.set(true);
        this.slideStart.emit();
        this.updateFromPointer(event, container);

        container.addEventListener(
            "pointermove",
            (e: PointerEvent) => {
                this.updateFromPointer(e, container);
            },
            { signal },
        );

        container.addEventListener(
            "pointerup",
            () => {
                this.dragging.set(false);
                this.slideEnd.emit();
                this.onTouched();
                this.abortController?.abort();
            },
            { signal },
        );
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (this.disabled()) return;
        this.onTouched();
        const s = this.step();
        const bigStep = (this.max() - this.min()) / 10;

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
            case "PageUp":
                event.preventDefault();
                this.setValue(this.snapToStep(this.value() + bigStep));
                break;
            case "PageDown":
                event.preventDefault();
                this.setValue(this.snapToStep(this.value() - bigStep));
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

    protected onNativeInput(event: Event): void {
        const val = Number((event.target as HTMLInputElement).value);
        this.setValue(val);
    }

    private updateFromPointer(e: PointerEvent, container: HTMLElement): void {
        const track = container.querySelector(".track") as HTMLElement;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const val = this.min() + percent * (this.max() - this.min());
        this.setValue(this.snapToStep(val));
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
        super.writeValue(v);
        const clamped = Math.max(this.min(), Math.min(this.max(), v ?? this.min()));
        this.value.set(this.snapToStep(clamped));
    }
}
