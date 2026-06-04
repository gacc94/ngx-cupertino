import { Directive, ElementRef, inject, Renderer2 } from "@angular/core";

@Directive({
    selector: "[cupRipple]",
    host: {
        "(click)": "onClick($event)",
    },
})
export class RippleDirective {
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    protected onClick(event: MouseEvent): void {
        const host = this.el.nativeElement;
        const ripple = this.renderer.createElement("span");
        const rect = host.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        this.renderer.addClass(ripple, "cup-ripple-effect");
        this.renderer.setStyle(ripple, "width", `${size}px`);
        this.renderer.setStyle(ripple, "height", `${size}px`);
        this.renderer.setStyle(ripple, "left", `${x}px`);
        this.renderer.setStyle(ripple, "top", `${y}px`);
        this.renderer.setStyle(host, "position", "relative");
        this.renderer.setStyle(host, "overflow", "hidden");
        this.renderer.appendChild(host, ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });
    }
}
