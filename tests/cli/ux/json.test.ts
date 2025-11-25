import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { deployCommand } from "../../../src/cli/commands/deploy";
import { setToken, clearToken } from "../../../src/providers/azion/http/token-store";

vi.mock("../../../src/cli/utils/token-prompt", () => ({
  promptTokenIfNeeded: vi.fn(async () => {})
}));

vi.mock("../../../src/usecases/deploy/deploy.factory", () => {
  return {
    createDeployUseCase: vi.fn(() => ({
      execute: vi.fn(async () => ({ success: true, report: { bucket: { name: "demo" }, sync: { uploaded: 2, skipped: 0 } } }))
    }))
  };
});

describe("CLI UX — JSON mode (TUX-018)", () => {
  const originalLog = console.log;
  const logs: string[] = [];

  beforeEach(() => {
    logs.length = 0;
    console.log = (...args: any[]) => logs.push(args.join(" "));
    setToken("test-token");
  });

  afterEach(() => {
    console.log = originalLog;
    clearToken();
    vi.clearAllMocks();
  });

  it("emits JSON-only output with --json", async () => {
    await deployCommand(["--json"]);
    expect(logs).toHaveLength(1);
    expect(() => JSON.parse(logs[0])).not.toThrow();
    const parsed = JSON.parse(logs[0]);
    expect(parsed.success).toBe(true);
    expect(parsed.report.bucket.name).toBe("demo");
  });
});
