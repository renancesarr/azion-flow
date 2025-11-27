import { describe, it, expect } from "vitest";
import * as http from "../../src/core/http";

describe("Azion HTTP Provider", () => {
  it("loads without crashing", () => {
    expect(http).toBeDefined();
  });
});
