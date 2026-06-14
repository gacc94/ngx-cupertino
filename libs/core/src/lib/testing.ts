import type { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { BehaviorSubject } from "rxjs";

/**
 * Shared test helpers for `@ngx-cupertino/core` specs.
 *
 * Not part of the public API and excluded from production builds (only reachable from
 * `*.spec.ts` files). Centralizes the controllable {@link BreakpointObserver} mock and the
 * root-element reset used across co-located service specs.
 */

export const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
export const HIGH_CONTRAST_QUERY = "(prefers-contrast: more)";

export interface MockBreakpointObserver {
    observer: Pick<BreakpointObserver, "observe">;
    setDark: (matches: boolean) => void;
    setHighContrast: (matches: boolean) => void;
}

/**
 * Provides a controllable {@link BreakpointObserver} for the signal-first `ThemeService`,
 * mirroring the real CDK `observe()` contract while letting tests drive media-query state.
 */
export function mockBreakpointObserver(
    initial: { dark?: boolean; highContrast?: boolean } = {},
): MockBreakpointObserver {
    const subjects = new Map<string, BehaviorSubject<BreakpointState>>();

    const subjectFor = (query: string): BehaviorSubject<BreakpointState> => {
        let subject = subjects.get(query);
        if (!subject) {
            const matches =
                query === DARK_SCHEME_QUERY
                    ? (initial.dark ?? false)
                    : query === HIGH_CONTRAST_QUERY
                      ? (initial.highContrast ?? false)
                      : false;
            subject = new BehaviorSubject<BreakpointState>({ matches, breakpoints: { [query]: matches } });
            subjects.set(query, subject);
        }
        return subject;
    };

    const emit = (query: string, matches: boolean): void => {
        subjectFor(query).next({ matches, breakpoints: { [query]: matches } });
    };

    return {
        observer: {
            observe: (value: string | readonly string[]) => {
                const query = Array.isArray(value) ? value[0] : (value as string);
                return subjectFor(query).asObservable();
            },
        },
        setDark: (matches: boolean) => emit(DARK_SCHEME_QUERY, matches),
        setHighContrast: (matches: boolean) => emit(HIGH_CONTRAST_QUERY, matches),
    };
}

/** Clears every design-system attribute and CSS variable the services write to `<html>`. */
export function resetRoot(doc: Document): void {
    const root = doc.documentElement;
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["mode"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["tint"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["surfaceStyle"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["liquidGlassVariant"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["liquidGlassLook"];
    root.removeAttribute("dir");
    root.removeAttribute("data-reduced-motion");
    root.style.removeProperty("--cup-tint");
    root.style.removeProperty("--cup-tint-subtle");
    root.style.removeProperty("--cup-tint-container");
    root.style.removeProperty("--cup-tint-on");
    root.style.removeProperty("--cup-focus-ring");
    root.style.removeProperty("--cup-min-touch-target");
}
