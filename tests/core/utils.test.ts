import { describe, it, expect } from "vitest";
import * as utils from "../../src/core/utils";

describe("Core Utils", () => {
  it("should load utils without crashing", () => {
    expect(utils).toBeDefined();
  });
});
