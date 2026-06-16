import type { CupComponentSize } from "@ngx-cupertino/core";
import type { CupIconSize } from "@ngx-cupertino/icons";
import { describe, expect, it } from "vitest";

/**
 * Type-parity guard for the deliberate `CupIconSize` duplicate.
 *
 * `icons` keeps an Angular `>=18` baseline and cannot peer-depend on `core` (`>=21`), so
 * `CupIconSize` mirrors `core.CupComponentSize` by hand. This guard lives in `ui` — which already
 * depends on both — so it catches any drift **without** coupling `icons` to `core`. If the two unions
 * diverge, `IconSizeParity` becomes `false` and the `const parity: IconSizeParity = true` below fails
 * to compile, breaking the build.
 */
type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type IconSizeParity = Equals<CupIconSize, CupComponentSize>;

describe("CupIconSize / CupComponentSize parity", () => {
    it("the two size unions are identical (enforced at compile time)", () => {
        const parity: IconSizeParity = true;
        expect(parity).toBe(true);
    });
});
