import {
    type EnvironmentProviders,
    inject,
    makeEnvironmentProviders,
    type Provider,
    provideEnvironmentInitializer,
} from "@angular/core";
import { A11yConfigService } from "../services/a11y-config.service";
import { AnnouncerService } from "../services/announcer.service";
import { BreakpointService } from "../services/breakpoint.service";
import { CupConfigService } from "../services/config.service";
import { DirectionService } from "../services/direction.service";
import { KeyManagerService } from "../services/key-manager.service";
import { LiquidGlassService } from "../services/liquid-glass.service";
import { SurfaceStyleService } from "../services/surface-style.service";
import { ThemeService } from "../services/theme.service";
import { CUP_CONFIG } from "../tokens/cup-config.token";
import type { CupConfig } from "../types/cupertino-config.types";

export { CUP_CONFIG } from "../tokens/cup-config.token";

/** Core config token + config store. */
function coreProviders(config?: CupConfig): Provider[] {
    return [{ provide: CUP_CONFIG, useValue: config ?? {} }, CupConfigService];
}

/**
 * DOM-sync services: each owns a reactive `effect()` that writes to `<html>` attributes/datasets.
 * `FocusService` and `FocusTrapService` are intentionally absent — they are component-scoped and
 * should be added to the `providers` array of the component that needs them.
 */
function domSyncProviders(): Provider[] {
    return [
        ThemeService,
        DirectionService,
        SurfaceStyleService,
        LiquidGlassService,
        A11yConfigService,
        BreakpointService,
    ];
}

/** Global a11y utilities with no DOM side-effects of their own. */
function a11yProviders(): Provider[] {
    return [AnnouncerService, KeyManagerService];
}

/**
 * Forces instantiation of every service that owns a DOM-sync `effect()`.
 * Angular creates services lazily; without this, effects would not run until the service
 * is first injected by a component.
 */
function eagerBoot(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        inject(ThemeService);
        inject(SurfaceStyleService);
        inject(DirectionService);
        inject(A11yConfigService);
    });
}

/**
 * Registers the core Cupertino provider stack and synchronizes initial global runtime state.
 *
 * `FocusService` and `FocusTrapService` are NOT included — add them to the `providers` array
 * of each component that requires focus monitoring or focus trapping.
 *
 * @param config Optional partial runtime configuration for the design system.
 * @returns Environment providers for the shared `core` runtime.
 */
export function provideCupertino(config?: CupConfig): EnvironmentProviders {
    return makeEnvironmentProviders([...coreProviders(config), ...domSyncProviders(), ...a11yProviders(), eagerBoot()]);
}
