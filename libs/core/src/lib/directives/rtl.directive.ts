import { Directive } from "@angular/core";

/**
 * Forces right-to-left flow on the host element.
 *
 * Applied as a static host `style` attribute, so it adds no change-detection binding — the
 * value never changes at runtime.
 *
 * @example
 * ```html
 * <div cupRtl>محتوى عربي</div>
 * ```
 */
@Directive({
    selector: "[cupRtl]",
    host: {
        style: "direction: rtl; text-align: start",
    },
})
export class CupRtlDirective {}
