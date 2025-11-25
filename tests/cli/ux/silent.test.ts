import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deployCommand } from "../../../src/cli/commands/deploy";
import { setToken, clearToken } from "../../../src/providers/azion/http/token-store";

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

describe("CLI UX — Silent mode (TUX-019)", () => {
  const originalLog = console.log;
  const originalErr = console.error;
  const logs: string[] = [];
  const errs: string[] = [];

  beforeEach(() => {
    logs.length = 0;
    errs.length = 0;
    console.log = (...args: any[]) => logs.push(args.join(" "));
    console.error = (...args: any[]) => errs.push(args.join(" "));
    setToken("test-token");
  });

  afterEach(() => {
    console.log = originalLog;
    console.error = originalErr;
    clearToken();
    vi.clearAllMocks();
  });

  it("suppresses step logs but still prints summary", async () => {
    await deployCommand(["--silent"]);
    expect(logs.some((l) => l.includes("Resumo do deploy"))).toBe(true);
    expect(logs.some((l) => l.includes("→"))).toBe(false);
    expect(logs.some((l) => l.includes("✓"))).toBe(false);
  });
});
