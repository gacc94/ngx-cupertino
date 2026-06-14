import { Directive, ElementRef, inject, Renderer2 } from "@angular/core";

/**
 * Adds a Material-style ripple effect originating from the pointer position on click.
 *
 * Uses {@link Renderer2} for all DOM mutations, keeping the directive safe to render on the
 * server (`@angular/ssr`), where direct `document` access is unavailable.
 *
 * @example
 * ```html
 * <button cupRipple>Tap me</button>
 * ```
 */
@Directive({
    selector: "[cupRipple]",
    host: {
        "(click)": "onClick($event)",
        "style.position": "relative",
        "style.overflow": "hidden",
    },
})
export class RippleDirective {
    private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly renderer = inject(Renderer2);

    protected onClick(event: MouseEvent): void {
        const host = this.el.nativeElement;
        const rect = host.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple: HTMLElement = this.renderer.createElement("span");
        this.renderer.addClass(ripple, "cup-ripple-effect");
        this.renderer.setStyle(ripple, "width", `${size}px`);
        this.renderer.setStyle(ripple, "height", `${size}px`);
        this.renderer.setStyle(ripple, "left", `${x}px`);
        this.renderer.setStyle(ripple, "top", `${y}px`);
        this.renderer.appendChild(host, ripple);

        const cleanup = this.renderer.listen(ripple, "animationend", () => {
            cleanup();
            this.renderer.removeChild(host, ripple);
        });
    }
}
