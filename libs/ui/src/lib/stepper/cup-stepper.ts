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
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CupFormControl } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

let nextId = 0;

@Component({
    selector: "cup-stepper",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CupStepper),
            multi: true,
        },
    ],
    host: {
        "[class.disabled]": "disabled()",
        "[class.at-min]": "atMin()",
        "[class.at-max]": "atMax()",
    },
    template: `
        @if (label()) {
            <label class="label" [attr.for]="showInput() ? stepperId : null">{{ label() }}</label>
        }
        <div class="controls">
            <button type="button"
                    class="decrement"
                    [disabled]="disabled() || atMin()"
                    (pointerdown)="onButtonDown('decrement')"
                    (pointerup)="onButtonUp()"
                    (pointerleave)="onButtonUp()"
                    aria-label="Decrease">
                <cup-icon name="minus" size="sm" />
            </button>
            @if (showInput()) {
                <input [id]="stepperId"
                       type="number"
                       [min]="min()"
                       [max]="max()"
                       [step]="step()"
                       [value]="displayValue()"
                       [disabled]="disabled()"
                       [attr.aria-label]="ariaLabel() || label() || null"
                       [attr.name]="name() || null"
                       role="spinbutton"
                       [attr.aria-valuemin]="min()"
                       [attr.aria-valuemax]="max()"
                       [attr.aria-valuenow]="value()"
                       (input)="onInput($event)"
                       (blur)="onBlur()"
                       (keydown)="onKeyDown($event)"
                        class="input" />
            } @else {
                <span class="value-display" [attr.aria-live]="'polite'">{{ displayValue() }}</span>
            }
            <button type="button"
                    class="increment"
                    [disabled]="disabled() || atMax()"
                    (pointerdown)="onButtonDown('increment')"
                    (pointerup)="onButtonUp()"
                    (pointerleave)="onButtonUp()"
                    aria-label="Increase">
                <cup-icon name="plus" size="sm" />
            </button>
        </div>
    `,
    styleUrl: "./cup-stepper.scss",
})
export class CupStepper extends CupFormControl<number> {
    private readonly destroyRef = inject(DestroyRef);
    private repeatTimeout: ReturnType<typeof setTimeout> | null = null;
    private repeatInterval: ReturnType<typeof setInterval> | null = null;

    override readonly value = model(0);
    readonly min = input(0, { transform: numberAttribute });
    readonly max = input(100, { transform: numberAttribute });
    readonly step = input(1, { transform: numberAttribute });
    readonly label = input<string>();
    readonly showInput = input(true, { transform: booleanAttribute });
    readonly wrap = input(false, { transform: booleanAttribute });
    readonly autoRepeat = input(true, { transform: booleanAttribute });
    readonly ariaLabel = input<string>();
    readonly name = input<string>();

    protected readonly stepperId = `cup-stepper-${nextId++}`;

    readonly atMin = computed(() => !this.wrap() && this.value() <= this.min());
    readonly atMax = computed(() => !this.wrap() && this.value() >= this.max());

    protected readonly displayValue = computed(() => {
        const v = this.value();
        const s = this.step();
        const decimals = (s.toString().split(".")[1] || "").length;
        return Number(v.toFixed(decimals));
    });

    constructor() {
        super();
        this.destroyRef.onDestroy(() => this.stopRepeat());
    }

    protected increment(multiplier = 1): void {
        if (this.disabled()) return;
        const next = this.value() + this.step() * multiplier;
        if (this.wrap() && next > this.max()) {
            this.setValue(this.min());
        } else {
            this.setValue(next);
        }
    }

    protected decrement(multiplier = 1): void {
        if (this.disabled()) return;
        const next = this.value() - this.step() * multiplier;
        if (this.wrap() && next < this.min()) {
            this.setValue(this.max());
        } else {
            this.setValue(next);
        }
    }

    protected onButtonDown(action: "increment" | "decrement"): void {
        if (action === "increment") this.increment();
        else this.decrement();

        if (!this.autoRepeat()) return;
        this.stopRepeat();

        this.repeatTimeout = setTimeout(() => {
            this.repeatInterval = setInterval(() => {
                if (action === "increment") this.increment();
                else this.decrement();
            }, 75);
        }, 400);
    }

    protected onButtonUp(): void {
        this.stopRepeat();
        this.onTouched();
    }

    protected onInput(event: Event): void {
        const val = Number((event.target as HTMLInputElement).value);
        if (!Number.isNaN(val)) {
            this.setValue(val);
        }
        this.onTouched();
    }

    protected onBlur(): void {
        this.onTouched();
    }

    protected onKeyDown(event: KeyboardEvent): void {
        if (this.disabled()) return;
        const multiplier = event.shiftKey ? 10 : 1;

        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                this.increment(multiplier);
                break;
            case "ArrowDown":
                event.preventDefault();
                this.decrement(multiplier);
                break;
        }
    }

    private setValue(v: number): void {
        const clamped = Math.max(this.min(), Math.min(this.max(), v));
        this.value.set(clamped);
        this.onChange(clamped);
    }

    private stopRepeat(): void {
        if (this.repeatTimeout !== null) {
            clearTimeout(this.repeatTimeout);
            this.repeatTimeout = null;
        }
        if (this.repeatInterval !== null) {
            clearInterval(this.repeatInterval);
            this.repeatInterval = null;
        }
    }

    override writeValue(v: number): void {
        super.writeValue(v);
        const clamped = Math.max(this.min(), Math.min(this.max(), v ?? this.min()));
        this.value.set(clamped);
    }
}
