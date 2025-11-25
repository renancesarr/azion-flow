import { access } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";

const DIST_ENTRY = join("dist", "index.js");

async function main() {
  await ensureDist();
  await runHelp();
  console.log("Release validation OK");
}

async function ensureDist() {
  try {
    await access(DIST_ENTRY);
  } catch {
    throw new Error(`Dist entry not found at ${DIST_ENTRY}. Run npm run build:release first.`);
  }
}

async function runHelp() {
  await new Promise<void>((resolve, reject) => {
    const child = spawn("node", [DIST_ENTRY, "--help"], { stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`CLI --help failed with code ${code}`));
    });
    child.on("error", reject);
  });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
