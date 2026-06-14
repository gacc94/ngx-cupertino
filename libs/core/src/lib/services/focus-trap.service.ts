import { type ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from "@angular/cdk/a11y";
import { DestroyRef, Injectable, inject, signal } from "@angular/core";

/**
 * Options controlling how a focus trap is created by {@link FocusTrapService.create}.
 */
export interface CupFocusTrapOptions {
    /**
     * Defers the creation of the trap anchor elements so the caller can attach them manually
     * through `ConfigurableFocusTrap.attachAnchors()`. Defaults to `false`.
     */
    defer?: boolean;
    /**
     * Moves focus into the trapped region as soon as it is ready. Defaults to `true`.
     */
    autoCapture?: boolean;
}

/**
 * Signal-friendly facade over the CDK {@link ConfigurableFocusTrapFactory}.
 *
 * The service creates focus traps around overlay-style regions (dialogs, sheets, popovers) and
 * keeps a registry of every active trap so they are all destroyed when the owning injector is
 * destroyed, preventing leaked document focus listeners.
 */
@Injectable()
export class FocusTrapService {
    private readonly factory = inject(ConfigurableFocusTrapFactory);
    private readonly destroyRef = inject(DestroyRef);
    private readonly traps = new Set<ConfigurableFocusTrap>();

    /** Whether at least one focus trap is currently active. */
    readonly isTrapped = signal(false);

    constructor() {
        this.destroyRef.onDestroy(() => {
            for (const trap of this.traps) {
                trap.destroy();
            }
            this.traps.clear();
            this.isTrapped.set(false);
        });
    }

    /**
     * Creates a focus trap around an element.
     *
     * @param element The element to trap focus within.
     * @param options Focus-trap creation options.
     * @returns The created {@link ConfigurableFocusTrap}. Release it with {@link FocusTrapService.release}.
     */
    create(element: HTMLElement, options: CupFocusTrapOptions = {}): ConfigurableFocusTrap {
        const trap = this.factory.create(element, { defer: options.defer ?? false });
        this.traps.add(trap);
        this.isTrapped.set(true);

        if (options.autoCapture !== false) {
            trap.focusInitialElementWhenReady();
        }

        return trap;
    }

    /**
     * Destroys a focus trap and removes it from the active registry.
     *
     * @param trap The trap previously returned by {@link FocusTrapService.create}.
     */
    release(trap: ConfigurableFocusTrap): void {
        trap.destroy();
        this.traps.delete(trap);
        this.isTrapped.set(this.traps.size > 0);
    }
}
