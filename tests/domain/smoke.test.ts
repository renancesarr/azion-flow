import { describe, it, expect } from "vitest";
import * as domain from "../../src/domains";

describe("Domain Layer", () => {
  it("should load without crashing", () => {
    expect(domain).toBeDefined();
  });
});
