import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const newVersion = process.argv[2];
  if (!newVersion) {
    console.error("Usage: node scripts/update-version.ts <new-version>");
    process.exit(1);
  }

  await updatePackageJson(newVersion);
  await writeFile("VERSION", `${newVersion}\n`, "utf-8");
  await updateChangelog(newVersion);
  console.log(`Version updated to ${newVersion}`);
}

async function updatePackageJson(version: string) {
  const path = "package.json";
  const content = await readFile(path, "utf-8");
  const pkg = JSON.parse(content);
  pkg.version = version;
  await writeFile(path, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
}

async function updateChangelog(version: string) {
  const path = "CHANGELOG.md";
  const content = await readFile(path, "utf-8");
  const lines = content.split("\n");
  const unreleasedIndex = lines.findIndex((l) => l.trim().startsWith("## [Unreleased]"));

  const entry = `## [${version}] - ${new Date().toISOString().slice(0, 10)}\n- Release ${version}\n`;

  if (unreleasedIndex !== -1) {
    lines.splice(unreleasedIndex + 1, 0, "", entry);
    await writeFile(path, lines.join("\n"), "utf-8");
    return;
  }

  await writeFile(path, `${content}\n${entry}`, "utf-8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
