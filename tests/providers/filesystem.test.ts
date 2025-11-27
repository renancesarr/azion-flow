import { describe, it, expect } from "vitest";
import { NodeFileSystemProvider } from "../../src/core/utils/fs/nodefs";

describe("Filesystem Provider", () => {
  it("loads without crashing", () => {
    const provider = new NodeFileSystemProvider();
    expect(provider).toBeDefined();
  });
});
