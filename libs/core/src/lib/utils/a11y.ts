/**
 * Reads `(prefers-reduced-motion: reduce)` once.
 *
 * @deprecated Inject {@link BreakpointService} and read `prefersReducedMotion` instead — the
 * signal stays in sync when the system preference changes; this one-shot read does not.
 */
export function prefersReducedMotion(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Reads `(forced-colors: active)` once.
 *
 * @deprecated Inject {@link BreakpointService} and read `hasForcedColors` instead — the signal
 * stays in sync when the system preference changes; this one-shot read does not.
 */
export function isHighContrastMode(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(forced-colors: active)").matches ?? false;
}

/**
 * Reads `(pointer: coarse)` once.
 *
 * @deprecated Inject {@link BreakpointService} and read `hasTouch` instead.
 */
export function hasCoarsePointer(doc?: Document): boolean {
    if (!doc) return false;
    return doc.defaultView?.matchMedia("(pointer: coarse)").matches ?? false;
}

/**
 * Enforces a minimum hit-target size on an element by setting `min-width`/`min-height`.
 *
 * Imperative DOM manipulation is appropriate here; there is no reactive equivalent.
 *
 * @param element The element to enforce the touch target on.
 * @param minSize The minimum width and height in pixels. Defaults to the 44px HIG target.
 */
export function ensureMinTouchTarget(element: HTMLElement, minSize = 44): void {
    const rect = element.getBoundingClientRect();
    if (rect.width < minSize || rect.height < minSize) {
        element.style.minWidth = `${minSize}px`;
        element.style.minHeight = `${minSize}px`;
    }
}
