import { describe, it, expect } from "vitest";
import * as ctx from "../../src/core/context";

describe("Core Context", () => {
  it("should load without crashing", () => {
    expect(ctx).toBeDefined();
  });
});
