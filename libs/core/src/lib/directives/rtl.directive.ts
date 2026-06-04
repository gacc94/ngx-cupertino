import { Directive } from "@angular/core";

@Directive({
    selector: "[cupRtl]",
    host: {
        "[style.direction]": "'rtl'",
        "[style.text-align]": "'start'",
    },
})
export class CupRtlDirective {}
