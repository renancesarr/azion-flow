import { describe, it, expect } from "vitest";
import * as domain from "../../src/domain";

describe("Domain Layer", () => {
  it("should load without crashing", () => {
    expect(domain).toBeDefined();
  });
});
