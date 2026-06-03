import { TOKENS_VERSION } from "@ngx-cupertino/tokens";
import { describe, expect, it } from "vitest";

describe("@ngx-cupertino/tokens", () => {
    it("should export TOKENS_VERSION", () => {
        expect(TOKENS_VERSION).toBe("0.0.1");
    });
});
