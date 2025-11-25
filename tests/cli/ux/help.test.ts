import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { helpCommand } from "../../../src/cli/commands/help";

describe("CLI UX — Help (TUX-021)", () => {
  const originalLog = console.log;
  const logs: string[] = [];

  beforeEach(() => {
    logs.length = 0;
    console.log = (...args: any[]) => logs.push(args.join(" "));
  });

  afterEach(() => {
    console.log = originalLog;
    vi.clearAllMocks();
  });

  it("prints help with commands and flags", () => {
    helpCommand();
    const text = logs.join("\n");
    expect(text).toContain("azion-flow — CLI");
    expect(text).toContain("deploy");
    expect(text).toContain("--json");
    expect(text).toContain("--silent");
  });
});
