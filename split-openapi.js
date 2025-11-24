import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import YAML from "./node_modules/yaml/dist/index.js";

const file = "docs/integration-api/azion-v4/openapi.yaml";
const raw = readFileSync(file, "utf-8");
const doc = YAML.parse(raw);
const paths = doc.paths || {};

const buckets = {};
const credentials = {};
const objects = {};
const applications = {};
const domains = {};

for (const [path, value] of Object.entries(paths)) {
  if (path.includes("storage/buckets") && !path.includes("objects")) buckets[path] = value;
  else if (path.includes("storage/credentials")) credentials[path] = value;
  else if (path.includes("storage/buckets") && path.includes("objects")) objects[path] = value;
  else if (path.includes("applications")) applications[path] = value;
  else if (path.includes("domains")) domains[path] = value;
}

const outDir = "docs/integration-api/azion-v4/split";
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

writeSpec("storage-buckets.yaml", buckets);
writeSpec("storage-credentials.yaml", credentials);
writeSpec("storage-objects.yaml", objects);
writeSpec("applications.yaml", applications);
writeSpec("domains.yaml", domains);
