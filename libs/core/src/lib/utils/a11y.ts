export function prefersReducedMotion(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function isHighContrastMode(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(forced-colors: active)").matches ?? false;
}

export function hasCoarsePointer(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(pointer: coarse)").matches ?? false;
}

export function ensureMinTouchTarget(element: HTMLElement, minSize = 44): void {
    const rect = element.getBoundingClientRect();
    if (rect.width < minSize || rect.height < minSize) {
        element.style.minWidth = `${minSize}px`;
        element.style.minHeight = `${minSize}px`;
    }
}
