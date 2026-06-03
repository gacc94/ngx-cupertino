import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["feat", "fix", "refactor", "test", "docs", "perf", "ci", "chore", "style", "build"],
        ],
        "scope-enum": [2, "always", ["tokens", "core", "icons", "ui", "playground", "readme", "ci", "repo"]],
    },
};

export default Configuration;
