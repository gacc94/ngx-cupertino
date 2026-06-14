import { FocusMonitor, type FocusOptions, type FocusOrigin } from "@angular/cdk/a11y";
import { DestroyRef, Injectable, inject, type Signal, signal } from "@angular/core";
import type { Subscription } from "rxjs";

/**
 * Signal-first facade over the CDK {@link FocusMonitor}.
 *
 * The service tracks how each monitored element received focus (keyboard, mouse, touch,
 * program) and exposes the latest origin as a readonly signal so templates and effects can
 * react without subscribing to RxJS streams. All active subscriptions are released when the
 * owning injector is destroyed.
 */
@Injectable()
export class FocusService {
    private readonly focusMonitor = inject(FocusMonitor);
    private readonly destroyRef = inject(DestroyRef);
    private readonly subscriptions = new Map<HTMLElement, Subscription>();

    constructor() {
        this.destroyRef.onDestroy(() => {
            for (const element of [...this.subscriptions.keys()]) {
                this.stopMonitoring(element);
            }
        });
    }

    /**
     * Monitors focus origin changes for an element and exposes them as a signal.
     *
     * Calling `monitor` again for the same element restarts monitoring. The returned signal
     * holds `null` until the element first receives focus.
     *
     * @param element The element to monitor.
     * @param checkChildren Whether focus on descendant elements should be reported.
     * @returns A readonly signal with the current {@link FocusOrigin}.
     */
    monitor(element: HTMLElement, checkChildren = false): Signal<FocusOrigin> {
        this.stopMonitoring(element);

        const origin = signal<FocusOrigin>(null);
        const subscription = this.focusMonitor.monitor(element, checkChildren).subscribe((value) => origin.set(value));
        this.subscriptions.set(element, subscription);

        return origin.asReadonly();
    }

    /**
     * Focuses an element while recording the supplied origin on the {@link FocusMonitor}.
     *
     * @param element The element to focus.
     * @param origin The focus origin to record.
     * @param options Native focus options forwarded to the element.
     */
    focusVia(element: HTMLElement, origin: FocusOrigin, options?: FocusOptions): void {
        this.focusMonitor.focusVia(element, origin, options);
    }

    /**
     * Stops monitoring an element and releases its subscription.
     *
     * @param element The element to stop monitoring.
     */
    stopMonitoring(element: HTMLElement): void {
        this.subscriptions.get(element)?.unsubscribe();
        this.subscriptions.delete(element);
        this.focusMonitor.stopMonitoring(element);
    }
}
