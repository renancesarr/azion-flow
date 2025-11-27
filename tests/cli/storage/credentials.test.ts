import { describe, it, expect, vi, afterEach } from "vitest";
import { credentialsCommand } from "../../../src/cli/commands/storage/credentials";
import { AzionCredentialsProvider } from "../../../src/domains/storage/azion.credentials";
import * as tokenPrompt from "../../../src/cli/utils/token-prompt";
import { setToken, clearToken } from "../../../src/core/http/token-store";

vi.mock("../../../src/cli/utils/token-prompt", () => ({
  promptTokenIfNeeded: vi.fn(async () => {}),
  setTokenDirect: vi.fn()
}));

describe("CLI storage credentials", () => {
  const originalLog = console.log;
  const logs: string[] = [];

  afterEach(() => {
    console.log = originalLog;
    logs.length = 0;
    clearToken();
    vi.restoreAllMocks();
  });

  it("lists credentials with JSON", async () => {
    vi.spyOn(tokenPrompt, "promptTokenIfNeeded").mockResolvedValue();
    setToken("t");
    const listSpy = vi.spyOn(AzionCredentialsProvider.prototype, "listCredentials").mockResolvedValue([
      { id: "1", name: "cred", type: "s3" }
    ]);
    console.log = (...args: any[]) => logs.push(args.join(" "));

    await credentialsCommand(["list", "--json"]);

    expect(listSpy).toHaveBeenCalled();
    expect(logs[0].trim().startsWith("[")).toBe(true);
  });

  it("creates credential and prints table", async () => {
    vi.spyOn(tokenPrompt, "promptTokenIfNeeded").mockResolvedValue();
    setToken("t");
    const createSpy = vi.spyOn(AzionCredentialsProvider.prototype, "createCredential").mockResolvedValue({
      id: "2",
      name: "cred",
      type: "s3"
    });
    console.log = (...args: any[]) => logs.push(args.join(" "));

    await credentialsCommand([
      "create",
      "--name",
      "cred",
      "--type",
      "s3",
      "--access-key",
      "x",
      "--secret-key",
      "y"
    ]);

    expect(createSpy).toHaveBeenCalled();
    expect(logs.join("\n")).toContain("cred");
  });
});
