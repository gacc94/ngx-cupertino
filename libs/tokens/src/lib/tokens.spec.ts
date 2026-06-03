import { describe, expect, it } from "vitest";
import { TOKENS_VERSION } from "./index";

describe("@ngx-cupertino/tokens", () => {
    it("should export TOKENS_VERSION", () => {
        expect(TOKENS_VERSION).toBe("0.0.1");
    });
});
