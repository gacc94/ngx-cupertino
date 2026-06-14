import { FocusMonitor, type FocusOrigin } from "@angular/cdk/a11y";
import { TestBed } from "@angular/core/testing";
import { Subject } from "rxjs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FocusService } from "./focus.service";

describe("FocusService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("exposes FocusMonitor origin as a signal and stops cleanly", () => {
        const origin$ = new Subject<FocusOrigin>();
        const stopMonitoring = vi.fn();
        const focusVia = vi.fn();

        TestBed.configureTestingModule({
            providers: [
                FocusService,
                {
                    provide: FocusMonitor,
                    useValue: {
                        monitor: () => origin$.asObservable(),
                        stopMonitoring,
                        focusVia,
                    } as Partial<FocusMonitor>,
                },
            ],
        });

        const service = TestBed.inject(FocusService);
        const element = document.createElement("button");
        const origin = service.monitor(element);

        expect(origin()).toBeNull();

        origin$.next("keyboard");
        expect(origin()).toBe("keyboard");

        service.focusVia(element, "program");
        expect(focusVia).toHaveBeenCalledWith(element, "program", undefined);

        service.stopMonitoring(element);
        expect(stopMonitoring).toHaveBeenCalledWith(element);

        origin$.next("mouse");
        expect(origin()).toBe("keyboard");
    });
});
