export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isHighContrastMode(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(forced-colors: active)").matches;
}

export function hasCoarsePointer(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
}

export function ensureMinTouchTarget(element: HTMLElement, minSize = 44): void {
    const rect = element.getBoundingClientRect();
    if (rect.width < minSize || rect.height < minSize) {
        element.style.minWidth = `${minSize}px`;
        element.style.minHeight = `${minSize}px`;
    }
}
