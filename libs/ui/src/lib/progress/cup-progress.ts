import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from "@angular/core";
import { type CupComponentSize, type CupProgressType } from "@ngx-cupertino/core";

@Component({
    selector: "cup-progress",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        "[class.cup-indeterminate]": "indeterminate()",
        "[class.cup-small]": "size() === 'sm'",
        "[class.cup-large]": "size() === 'lg'",
        "[class.cup-linear]": "type() === 'linear'",
        "[class.cup-circular-host]": "type() === 'circular'",
        "[class.cup-spinner-host]": "type() === 'spinner'",
    },
    template: `
        @switch (type()) {
            @case ('linear') {
                <div class="cup-linear"
                     role="progressbar"
                     [attr.aria-valuenow]="indeterminate() ? null : value()"
                     [attr.aria-valuemin]="0"
                     [attr.aria-valuemax]="indeterminate() ? null : max()"
                     [attr.aria-label]="ariaLabel() || label() || 'Progress'">
                    <div class="cup-track">
                        <div class="cup-fill" [style.width.%]="indeterminate() ? null : percentage()"></div>
                    </div>
                    @if (label() || showPercentage()) {
                        <div class="cup-info">
                            @if (label()) {
                                <span class="cup-label">{{ label() }}</span>
                            }
                            @if (showPercentage() && !indeterminate()) {
                                <span class="cup-percentage">{{ percentage() }}%</span>
                            }
                        </div>
                    }
                </div>
            }
            @case ('circular') {
                <svg class="cup-circular"
                     viewBox="0 0 36 36"
                     role="progressbar"
                     [attr.aria-valuenow]="value()"
                     [attr.aria-valuemin]="0"
                     [attr.aria-valuemax]="max()"
                     [attr.aria-label]="ariaLabel() || label() || 'Progress'">
                    <circle class="cup-circular-track"
                            cx="18" cy="18" r="15.5"
                            fill="none"
                            stroke-width="3" />
                    <circle class="cup-circular-fill"
                            cx="18" cy="18" r="15.5"
                            fill="none"
                            stroke-width="3"
                            stroke-linecap="round"
                            [attr.stroke-dasharray]="circumference()"
                            [attr.stroke-dashoffset]="offset()"
                            transform="rotate(-90 18 18)" />
                </svg>
                @if (label()) {
                    <span class="cup-label cup-label-below">{{ label() }}</span>
                }
            }
            @case ('spinner') {
                <div class="cup-spinner"
                     role="status"
                     [attr.aria-label]="ariaLabel() || 'Loading'">
                    @for (line of spinnerLines; track $index) {
                        <div class="cup-spinner-line"
                             [style.transform]="'rotate(' + line + 'deg)'"
                             [style.animation-delay]="(-1.2 + $index * 0.1) + 's'"></div>
                    }
                </div>
            }
        }
    `,
    styleUrl: "./cup-progress.scss",
})
export class CupProgress {
    readonly value = input(0, { transform: numberAttribute });
    readonly max = input(100, { transform: numberAttribute });
    readonly type = input<CupProgressType>("linear");
    readonly size = input<CupComponentSize>("md");
    readonly indeterminate = input(false, { transform: booleanAttribute });
    readonly label = input<string>();
    readonly showPercentage = input(false, { transform: booleanAttribute });
    readonly ariaLabel = input<string>();

    readonly percentage = computed(() => {
        const m = this.max();
        if (m === 0) return 0;
        return Math.min(100, Math.round((this.value() / m) * 100));
    });

    readonly circumference = computed(() => 2 * Math.PI * 15.5);

    readonly offset = computed(() => {
        const ratio = this.value() / this.max();
        return this.circumference() * (1 - Math.min(1, ratio));
    });

    protected readonly spinnerLines = Array.from({ length: 12 }, (_, i) => i * 30);
}
