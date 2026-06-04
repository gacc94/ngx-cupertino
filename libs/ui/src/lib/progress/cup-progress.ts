import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

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
    styles: [
        `
            :host {
                display: block;
            }

            .cup-progress-linear {
                display: flex;
                flex-direction: column;
                gap: var(--cup-spacing-1);
            }

            .cup-progress-track {
                width: 100%;
                height: 6px;
                background: var(--cup-fill-quaternary);
                border-radius: 3px;
                overflow: hidden;
            }

            .cup-progress-fill {
                height: 100%;
                background: var(--cup-tint);
                border-radius: 3px;
                transition: width var(--cup-duration-fast) var(--cup-easing-default);
            }

            .cup-progress-label {
                font-size: var(--cup-font-size-caption);
                color: var(--cup-label-secondary);
            }

            .cup-progress-circular {
                width: 48px;
                height: 48px;
            }

            .cup-progress-circular-track {
                transition: stroke var(--cup-duration-fast) var(--cup-easing-default);
            }

            .cup-progress-circular-fill {
                transition: stroke-dashoffset var(--cup-duration-slow) var(--cup-easing-default);
            }
        `,
    ],
})
export class CupProgress {
    readonly value = input(0);
    readonly max = input(100);
    readonly type = input<"linear" | "circular">("linear");
    readonly size = input<"sm" | "md" | "lg">("md");
    readonly label = input<string>();

    readonly percentage = computed(() => Math.round((this.value() / this.max()) * 100));

    readonly circumference = computed(() => 2 * Math.PI * 15.5);

    readonly offset = computed(() => {
        const ratio = this.value() / this.max();
        return this.circumference() * (1 - ratio);
    });
}
