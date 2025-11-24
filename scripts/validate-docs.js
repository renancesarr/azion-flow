#!/usr/bin/env node
/**
 * Quick validation for docs presence and basic format.
 * Intentionally lightweight to avoid external tooling.
 */
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const requiredFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "docs/user/install.md",
  "docs/user/getting-started.md",
  "docs/user/commands.md",
  "docs/architecture/overview.md",
  "docs/architecture/execution-flow.md",
  "docs/architecture/providers.md",
  "docs/architecture/services.md",
  "docs/architecture/cli.md",
  "docs/reference/api.md",
  "docs/reference/config.md",
  "docs/reference/errors.md",
  "docs/ai/overview.md",
  "docs/ai/prompts.md",
  "examples/basic-deploy/config.json",
  "examples/multi-folder/config.json",
  "examples/custom-domain/config.json"
];

const errors = [];

for (const rel of requiredFiles) {
  const full = path.join(repoRoot, rel);
  if (!fs.existsSync(full)) {
    errors.push(`Missing required file: ${rel}`);
    continue;
  }
  const content = fs.readFileSync(full, "utf8");
  const firstLine = content.split(/\r?\n/).find(Boolean) ?? "";
  if (firstLine && !firstLine.startsWith("#") && rel.endsWith(".md")) {
    errors.push(`File should start with a heading: ${rel}`);
  }
}

if (errors.length) {
  console.error("❌ Docs validation failed:");
  for (const err of errors) {
    console.error("- " + err);
  }
  process.exit(1);
}

console.log("✅ Docs validation passed.");
