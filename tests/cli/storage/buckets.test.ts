import { describe, it, expect, vi, afterEach } from "vitest";
import { bucketsCommand } from "../../../src/cli/commands/storage/buckets";
import { AzionStorageProvider } from "../../../src/domains/storage/services/azion.storage";
import * as tokenPrompt from "../../../src/cli/utils/token-prompt";
import { setToken, clearToken } from "../../../src/core/http/token-store";

vi.mock("../../../src/cli/utils/token-prompt", () => ({
  promptTokenIfNeeded: vi.fn(async () => {}),
  setTokenDirect: vi.fn()
}));

describe("CLI storage buckets", () => {
  const originalLog = console.log;
  const logs: string[] = [];

  afterEach(() => {
    console.log = originalLog;
    logs.length = 0;
    clearToken();
    vi.restoreAllMocks();
  });

  it("lists buckets with JSON", async () => {
    vi.spyOn(tokenPrompt, "promptTokenIfNeeded").mockResolvedValue();
    setToken("t");
    const bucketsSpy = vi.spyOn(AzionStorageProvider.prototype, "listBuckets").mockResolvedValue([
      { id: "1", name: "demo" }
    ]);
    console.log = (...args: any[]) => logs.push(args.join(" "));

    await bucketsCommand(["list", "--json"]);

    expect(bucketsSpy).toHaveBeenCalled();
    expect(logs[0].trim().startsWith("[")).toBe(true);
  });

  it("creates bucket and prints table", async () => {
    vi.spyOn(tokenPrompt, "promptTokenIfNeeded").mockResolvedValue();
    setToken("t");
    const ensureSpy = vi.spyOn(AzionStorageProvider.prototype, "ensureBucket").mockResolvedValue({
      id: "2",
      name: "new"
    });
    console.log = (...args: any[]) => logs.push(args.join(" "));

    await bucketsCommand(["create", "new"]);

    expect(ensureSpy).toHaveBeenCalledWith("new");
    expect(logs.join("\n")).toContain("new");
  });
});
