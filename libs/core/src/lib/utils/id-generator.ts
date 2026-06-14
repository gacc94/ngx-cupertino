import { InjectionToken, inject } from "@angular/core";

const CUP_ID_SEQ = new InjectionToken<{ n: number }>("CUP_ID_SEQ", {
    factory: () => ({ n: 0 }),
});

/**
 * Generates a unique element ID scoped to the current Angular injector.
 *
 * Must be called from an injection context (component/directive/service constructor or
 * `runInInjectionContext`). The counter resets per root injector, making it SSR-safe.
 */
export function generateId(prefix = "cup"): string {
    return `${prefix}-${++inject(CUP_ID_SEQ).n}`;
}
