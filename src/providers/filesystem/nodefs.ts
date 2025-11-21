import { readdir, stat, readFile as fsReadFile } from "node:fs/promises";
import { join } from "node:path";

export class NodeFileSystemProvider {
  async listLocalFiles(baseDir: string): Promise<string[]> {
    const results: string[] = [];
    const walk = async (dir: string) => {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith(".")) continue; // skip hidden
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(full);
        } else if (entry.isFile()) {
          results.push(full.replace(`${baseDir}/`, ""));
        }
      }
    };
    await walk(baseDir);
    return results;
  }

  async readFile(path: string): Promise<Buffer> {
    return fsReadFile(path);
  }
}
