import { describe, it, expect } from "vitest";
import * as errors from "../../src/core/errors";

describe("Core Errors", () => {
  it("should load without crashing", () => {
    expect(errors).toBeDefined();
  });
});
