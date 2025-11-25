import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { deployCommand } from "../../../src/cli/commands/deploy";
import { helpCommand } from "../../../src/cli/commands/help";
import { createDeployUseCase } from "../../../src/usecases/deploy/deploy.factory";
import { promptTokenIfNeeded } from "../../../src/cli/utils/token-prompt";
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
        return { success: true, report: { bucket: { name: "demo" }, sync: { uploaded: 1, skipped: 0 }, timings: { ValidateLocalEnvStep: 10 } } };
      })
    }))
  };
});

describe("CLI UX basic", () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const logs: string[] = [];
  const errors: string[] = [];

  beforeEach(() => {
    logs.length = 0;
    errors.length = 0;
    console.log = (...args: any[]) => logs.push(args.join(" "));
    console.error = (...args: any[]) => errors.push(args.join(" "));
    setToken("test-token");
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    clearToken();
    vi.clearAllMocks();
  });

  it("should show loading/success logs and summary in normal mode", async () => {
    await deployCommand([]);
    expect(logs.some((l) => l.includes("→"))).toBe(true);
    expect(logs.some((l) => l.includes("✓"))).toBe(true);
    expect(logs.some((l) => l.includes("Resumo do deploy"))).toBe(true);
  });

  it("should print JSON output when --json is set", async () => {
    logs.length = 0;
    await deployCommand(["--json"]);
    expect(logs.some((l) => l.trim().startsWith("{"))).toBe(true);
  });

  it("should suppress logs when --silent is set (except summary) and still succeed", async () => {
    logs.length = 0;
    await deployCommand(["--silent"]);
    expect(logs.some((l) => l.includes("Resumo do deploy"))).toBe(true);
  });

  it("should display help text", () => {
    helpCommand();
    expect(logs.some((l) => l.includes("azion-flow — CLI"))).toBe(true);
  });
});
