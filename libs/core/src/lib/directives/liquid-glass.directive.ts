import { computed, Directive, input } from "@angular/core";
import { CUP_GLASS_CSS_VARS } from "../constants/dom-attributes";
import type { CupLiquidGlassVariant } from "../types/cupertino-config.types";

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
    readonly cupLiquidGlass = input<CupLiquidGlassVariant>("regular");

    protected readonly styles = computed(() => {
        const v = this.cupLiquidGlass();

        if (v === "clear") {
            return {
                backdropFilter: CUP_GLASS_CSS_VARS.clearBlur,
                background: CUP_GLASS_CSS_VARS.clearBg,
                border: CUP_GLASS_CSS_VARS.clearBorder,
                boxShadow: CUP_GLASS_CSS_VARS.inset,
            };
        }

        if (v === "prominent") {
            return {
                backdropFilter: CUP_GLASS_CSS_VARS.blurLg,
                background: CUP_GLASS_CSS_VARS.bgLg,
                border: CUP_GLASS_CSS_VARS.borderLg,
                boxShadow: `${CUP_GLASS_CSS_VARS.shadowLg}, ${CUP_GLASS_CSS_VARS.inset}`,
            };
        }

        return {
            backdropFilter: CUP_GLASS_CSS_VARS.blurMd,
            background: CUP_GLASS_CSS_VARS.bgMd,
            border: CUP_GLASS_CSS_VARS.borderMd,
            boxShadow: `${CUP_GLASS_CSS_VARS.shadowMd}, ${CUP_GLASS_CSS_VARS.inset}`,
        };
    });
}
