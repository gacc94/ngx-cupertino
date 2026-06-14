import { LiveAnnouncer } from "@angular/cdk/a11y";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AnnouncerService } from "./announcer.service";

describe("AnnouncerService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("delegates announcements to the CDK LiveAnnouncer", () => {
        const announce = vi.fn().mockResolvedValue(undefined);
        const clear = vi.fn();

        TestBed.configureTestingModule({
            providers: [
                AnnouncerService,
                { provide: LiveAnnouncer, useValue: { announce, clear } as Partial<LiveAnnouncer> },
            ],
        });

        const service = TestBed.inject(AnnouncerService);

        service.polite("saved");
        expect(announce).toHaveBeenCalledWith("saved", "polite");

        service.assertive("error");
        expect(announce).toHaveBeenCalledWith("error", "assertive");

        service.announce("timed", "polite", 2000);
        expect(announce).toHaveBeenCalledWith("timed", "polite", 2000);

        service.clear();
        expect(clear).toHaveBeenCalledTimes(1);
    });
});
