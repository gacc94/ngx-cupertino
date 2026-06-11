import { computed, Directive, input } from "@angular/core";

export type LiquidGlassVariant = "regular" | "clear" | "prominent";

@Directive({
    selector: "[cupLiquidGlass]",
    host: {
        "[style.backdrop-filter]": "styles().backdropFilter",
        "[style.-webkit-backdrop-filter]": "styles().backdropFilter",
        "[style.background]": "styles().background",
        "[style.border]": "styles().border",
        "[style.box-shadow]": "styles().boxShadow",
        "[style.background-clip]": "'padding-box'",
    },
})
export class LiquidGlassDirective {
    readonly cupLiquidGlass = input<LiquidGlassVariant>("regular");

    protected readonly styles = computed(() => {
        const variant = this.cupLiquidGlass();

        if (variant === "clear") {
            return {
                backdropFilter: "var(--cup-glass-clear-blur)",
                background: "var(--cup-glass-clear-bg)",
                border: "var(--cup-glass-clear-border)",
                boxShadow: "var(--cup-glass-inset)",
            };
        }

        if (variant === "prominent") {
            return {
                backdropFilter: "var(--cup-glass-blur-lg)",
                background: "var(--cup-glass-bg-lg)",
                border: "var(--cup-glass-border-lg)",
                boxShadow: "var(--cup-glass-shadow-lg), var(--cup-glass-inset)",
            };
        }

        return {
            backdropFilter: "var(--cup-glass-blur-md)",
            background: "var(--cup-glass-bg-md)",
            border: "var(--cup-glass-border-md)",
            boxShadow: "var(--cup-glass-shadow-md), var(--cup-glass-inset)",
        };
    });
}
