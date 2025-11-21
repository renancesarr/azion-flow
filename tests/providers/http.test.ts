import { describe, it, expect } from "vitest";
import * as http from "../../src/providers/azion/http";

describe("Azion HTTP Provider", () => {
  it("loads without crashing", () => {
    expect(http).toBeDefined();
  });
});
