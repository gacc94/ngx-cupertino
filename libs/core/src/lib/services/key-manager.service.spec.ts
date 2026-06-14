import type { FocusableOption } from "@angular/cdk/a11y";
import { signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import { KeyManagerService } from "./key-manager.service";

describe("KeyManagerService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("builds a signal-driven FocusKeyManager that focuses the active option", () => {
        TestBed.configureTestingModule({ providers: [KeyManagerService] });
        const service = TestBed.inject(KeyManagerService);

        const focused: number[] = [];
        const makeOption = (id: number): FocusableOption => ({
            focus: () => focused.push(id),
        });
        const items = signal<readonly FocusableOption[]>([makeOption(0), makeOption(1), makeOption(2)]);

        const manager = service.createFocusKeyManager(items);
        manager.setActiveItem(1);

        expect(manager.activeItemIndex).toBe(1);
        expect(focused).toEqual([1]);

        manager.destroy();
    });
});
