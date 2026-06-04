import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { type CupComponentSize, type CupProgressType } from "@ngx-cupertino/core";

@Component({
    selector: "cup-progress",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (type() === 'linear') {
            <div class="cup-progress-linear"
                 role="progressbar"
                 [attr.aria-valuenow]="value()"
                 [attr.aria-valuemin]="0"
                 [attr.aria-valuemax]="max()"
                 [attr.aria-label]="label() || 'Progress'">
                <div class="cup-progress-track">
                    <div class="cup-progress-fill" [style.width.%]="percentage()"></div>
                </div>
                @if (label()) {
                    <span class="cup-progress-label">{{ label() }} — {{ percentage() }}%</span>
                }
            </div>
        } @else {
            <svg class="cup-progress-circular"
                 viewBox="0 0 36 36"
                 role="progressbar"
                 [attr.aria-valuenow]="value()"
                 [attr.aria-valuemin]="0"
                 [attr.aria-valuemax]="max()"
                 [attr.aria-label]="label() || 'Progress'">
                <circle class="cup-progress-circular-track"
                        cx="18" cy="18" r="15.5"
                        fill="none"
                        stroke="var(--cup-fill-quaternary)"
                        stroke-width="3" />
                <circle class="cup-progress-circular-fill"
                        cx="18" cy="18" r="15.5"
                        fill="none"
                        stroke="var(--cup-tint)"
                        stroke-width="3"
                        stroke-linecap="round"
                        [attr.stroke-dasharray]="circumference()"
                        [attr.stroke-dashoffset]="offset()"
                        transform="rotate(-90 18 18)" />
            </svg>
        }
    `,
    styleUrl: "./cup-progress.scss",
})
export class CupProgress {
    readonly value = input(0);
    readonly max = input(100);
    readonly type = input<CupProgressType>("linear");
    readonly size = input<CupComponentSize>("md");
    readonly label = input<string>();

    readonly percentage = computed(() => Math.round((this.value() / this.max()) * 100));

    readonly circumference = computed(() => 2 * Math.PI * 15.5);

    readonly offset = computed(() => {
        const ratio = this.value() / this.max();
        return this.circumference() * (1 - ratio);
    });
}
