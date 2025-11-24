import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import YAML from "./node_modules/yaml/dist/index.js";

const file = "docs/integration-api/azion-v4/openapi.yaml";
const raw = readFileSync(file, "utf-8");
const doc = YAML.parse(raw);
const paths = doc.paths || {};

const groups = new Map();

for (const [path, value] of Object.entries(paths)) {
  const segments = path.split("/").filter(Boolean);
  if (!segments.length) continue;
  const group = segments.slice(0, 2).join("-");
  if (!groups.has(group)) groups.set(group, {});
  groups.get(group)[path] = value;
}

const outDir = "docs/integration-api/azion-v4/split";
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

function writeSpec(name, filteredPaths) {
  const spec = {
    openapi: doc.openapi,
    info: doc.info,
    servers: doc.servers,
    security: doc.security,
    components: doc.components,
    paths: filteredPaths
  };
  writeFileSync(join(outDir, name), YAML.stringify(spec));
}

for (const [group, filteredPaths] of groups.entries()) {
  const safeName = group.replace(/[^a-zA-Z0-9_-]/g, "_");
  writeSpec(`${safeName}.yaml`, filteredPaths);
}
