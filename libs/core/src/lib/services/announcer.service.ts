import { type AriaLivePoliteness, LiveAnnouncer } from "@angular/cdk/a11y";
import { Injectable, inject } from "@angular/core";

/**
 * Thin facade over the CDK {@link LiveAnnouncer} for screen-reader announcements.
 *
 * The service centralizes ARIA live-region messaging behind an intent-revealing API
 * ({@link AnnouncerService.polite} / {@link AnnouncerService.assertive}) while still exposing
 * the full {@link AnnouncerService.announce} surface for advanced cases.
 */
@Injectable()
export class AnnouncerService {
    private readonly liveAnnouncer = inject(LiveAnnouncer);

    /**
     * Announces a message to assistive technology.
     *
     * @param message The message to announce.
     * @param politeness The ARIA live politeness level. Defaults to `polite`.
     * @param duration Optional time, in milliseconds, after which the live region is cleared.
     * @returns A promise that resolves once the message has been added to the live region.
     */
    announce(message: string, politeness: AriaLivePoliteness = "polite", duration?: number): Promise<void> {
        return duration === undefined
            ? this.liveAnnouncer.announce(message, politeness)
            : this.liveAnnouncer.announce(message, politeness, duration);
    }

    /**
     * Announces a non-urgent message using `aria-live="polite"`.
     *
     * @param message The message to announce.
     * @returns A promise that resolves once the message has been queued.
     */
    polite(message: string): Promise<void> {
        return this.liveAnnouncer.announce(message, "polite");
    }

    /**
     * Announces an urgent message using `aria-live="assertive"`, interrupting current output.
     *
     * @param message The message to announce.
     * @returns A promise that resolves once the message has been queued.
     */
    assertive(message: string): Promise<void> {
        return this.liveAnnouncer.announce(message, "assertive");
    }

    /** Clears the current live-region content. */
    clear(): void {
        this.liveAnnouncer.clear();
    }
}
