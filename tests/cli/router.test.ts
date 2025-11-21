import { describe, it } from "vitest";
import { routeCommand } from "../../src/cli/router";

describe("CLI Router", () => {
  it("should not throw when called with empty args", async () => {
    await routeCommand([]);
  });
});
