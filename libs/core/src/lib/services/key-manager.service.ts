import {
    ActiveDescendantKeyManager,
    type FocusableOption,
    FocusKeyManager,
    type Highlightable,
} from "@angular/cdk/a11y";
import { Injectable, Injector, inject, type Signal } from "@angular/core";

/**
 * Factory facade that builds CDK keyboard managers from Angular signals.
 *
 * Angular 21 query results (`contentChildren`, `viewChildren`) are signals, so this service
 * wires them directly into the CDK key managers using their signal-aware constructors. It owns
 * no per-manager state; the returned manager is owned by the caller, which should pipe keyboard
 * events into `onKeydown` and dispose of it with the rest of its component.
 */
@Injectable()
export class KeyManagerService {
    private readonly injector = inject(Injector);

    /**
     * Creates a {@link FocusKeyManager} that moves DOM focus between focusable options.
     *
     * Use this for roving-tabindex widgets (toolbars, segmented controls, menus) where the
     * active item should physically hold focus.
     *
     * @param items A signal of focusable options, typically a `contentChildren()` result.
     * @returns A {@link FocusKeyManager} bound to the supplied signal.
     */
    createFocusKeyManager<T extends FocusableOption>(items: Signal<readonly T[]>): FocusKeyManager<T> {
        return new FocusKeyManager<T>(items, this.injector);
    }

    /**
     * Creates an {@link ActiveDescendantKeyManager} that tracks the active option via styling.
     *
     * Use this for `aria-activedescendant` widgets (listboxes, comboboxes) where DOM focus stays
     * on the container and the active option is indicated visually instead of focused.
     *
     * @param items A signal of highlightable options, typically a `contentChildren()` result.
     * @returns An {@link ActiveDescendantKeyManager} bound to the supplied signal.
     */
    createActiveDescendantKeyManager<T extends Highlightable>(
        items: Signal<readonly T[]>,
    ): ActiveDescendantKeyManager<T> {
        return new ActiveDescendantKeyManager<T>(items, this.injector);
    }
}
