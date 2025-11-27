import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deployCommand } from "../../../src/cli/commands/deploy";
import { setToken, clearToken } from "../../../src/core/http/token-store";

vi.mock("../../../src/cli/utils/token-prompt", () => ({
  promptTokenIfNeeded: vi.fn(async () => {})
}));

vi.mock("../../../src/usecases/deploy/deploy.factory", () => {
  return {
    createDeployUseCase: vi.fn(({ stepLogger }) => ({
      execute: vi.fn(async () => {
        stepLogger?.onStart?.("ValidateLocalEnvStep");
        stepLogger?.onSuccess?.("ValidateLocalEnvStep");
        return { success: true, report: { bucket: { name: "demo" }, sync: { uploaded: 1, skipped: 0 } } };
      })
    }))
  };
});

describe("CLI UX — No color mode (TUX-020)", () => {
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
    delete process.env.NO_COLOR;
  });

  it("disables ANSI codes when --no-color is set", async () => {
    await deployCommand(["--no-color"]);
    const combined = logs.join("\n");
    expect(process.env.NO_COLOR).toBe("1");
    expect(combined.includes("\u001b[")).toBe(false);
  });
});
