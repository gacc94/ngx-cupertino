import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
    selector: "[cupRipple]",
    host: {
        "(click)": "onClick($event)",
        "style.position": "relative",
        "style.overflow": "hidden",
    },
})
export class RippleDirective {
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly document = inject(DOCUMENT);

    protected onClick(event: MouseEvent): void {
        const host = this.el.nativeElement;
        const ripple = this.document.createElement("span");
        const rect = host.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.classList.add("cup-ripple-effect");
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        host.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    }
}
