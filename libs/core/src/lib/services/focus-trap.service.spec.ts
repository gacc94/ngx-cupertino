import { type ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from "@angular/cdk/a11y";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FocusTrapService } from "./focus-trap.service";

describe("FocusTrapService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("creates focus traps, auto-captures focus, and releases them", () => {
        const focusInitialElementWhenReady = vi.fn();
        const destroy = vi.fn();
        const trap = { focusInitialElementWhenReady, destroy } as unknown as ConfigurableFocusTrap;
        const create = vi.fn().mockReturnValue(trap);

        TestBed.configureTestingModule({
            providers: [
                FocusTrapService,
                {
                    provide: ConfigurableFocusTrapFactory,
                    useValue: { create } as Partial<ConfigurableFocusTrapFactory>,
                },
            ],
        });

        const service = TestBed.inject(FocusTrapService);
        const element = document.createElement("div");
        const created = service.create(element);

        expect(create).toHaveBeenCalledWith(element, { defer: false });
        expect(focusInitialElementWhenReady).toHaveBeenCalledTimes(1);
        expect(created).toBe(trap);

        service.release(trap);
        expect(destroy).toHaveBeenCalledTimes(1);
    });

    it("skips focus-trap auto-capture when disabled", () => {
        const focusInitialElementWhenReady = vi.fn();
        const trap = {
            focusInitialElementWhenReady,
            destroy: vi.fn(),
        } as unknown as ConfigurableFocusTrap;

        TestBed.configureTestingModule({
            providers: [
                FocusTrapService,
                {
                    provide: ConfigurableFocusTrapFactory,
                    useValue: { create: () => trap } as Partial<ConfigurableFocusTrapFactory>,
                },
            ],
        });

        const service = TestBed.inject(FocusTrapService);
        service.create(document.createElement("div"), { defer: true, autoCapture: false });

        expect(focusInitialElementWhenReady).not.toHaveBeenCalled();
    });
});
