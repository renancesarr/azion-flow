import { describe, it, expect } from "vitest";
import { NodeFileSystemProvider } from "../../src/providers/filesystem/nodefs";

describe("Filesystem Provider", () => {
  it("loads without crashing", () => {
    const provider = new NodeFileSystemProvider();
    expect(provider).toBeDefined();
  });
});
