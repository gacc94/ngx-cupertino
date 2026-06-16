import type { LucideIcon } from "@lucide/angular";

/** Strips a trailing `.fill` (suffix only) from an SF Symbol name, e.g. `heart.fill` → `heart`. */
export function stripFillSuffix(name: string): string {
    return name.endsWith(".fill") ? name.slice(0, -".fill".length) : name;
}

/**
 * Resolves an SF Symbol / Lucide `name` to its registered glyph: tries the exact name first, then the
 * `.fill`-stripped base. Returns `undefined` when the name is not registered (or there is no registry).
 *
 * Pure and Angular-free, so it is unit-testable and reusable outside the component (gallery, tooling).
 */
export function resolveCupIcon(
    registry: ReadonlyMap<string, LucideIcon> | null | undefined,
    name: string,
): LucideIcon | undefined {
    if (!registry) return undefined;
    return registry.get(name) ?? registry.get(stripFillSuffix(name));
}
