import { Directive, input, type OnInit } from "@angular/core";

export type LiquidGlassVariant = "regular" | "clear" | "prominent";

@Directive({
    selector: "[cupLiquidGlass]",
    host: {
        "[style.backdrop-filter]": `'blur(var(--cup-blur-light)) saturate(var(--cup-glass-saturation))'`,
        "[style.-webkit-backdrop-filter]": `'blur(var(--cup-blur-light)) saturate(var(--cup-glass-saturation))'`,
        "[style.background]": "backgroundToken()",
        "[style.border]": "'0.5px solid var(--cup-glass-border-light)'",
    },
})
export class LiquidGlassDirective implements OnInit {
    readonly cupLiquidGlass = input<LiquidGlassVariant>("regular");

    ngOnInit(): void {
        this.applyBackground();
    }

    protected backgroundToken(): string {
        const variant = this.cupLiquidGlass();
        if (variant === "clear") return "var(--cup-glass-bg-clear)";
        if (variant === "prominent") return "var(--cup-glass-bg-prominent)";
        return "var(--cup-glass-bg-regular)";
    }

    private applyBackground(): void {}
}
