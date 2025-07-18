import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-length": [RuleConfigSeverity.Error, "always", 80],
    "subject-max-length": [RuleConfigSeverity.Error, "always", 50],
    "subject-case": [
      RuleConfigSeverity.Disabled,
      "always",
      [
        "lower-case",
        "upper-case",
        "pascal-case",
        "camel-case",
        "kebab-case",
        "snake-case",
        "start-case",
        "sentence-case",
      ],
    ],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "merge",
      ],
    ],
  },
};

export default Configuration;
