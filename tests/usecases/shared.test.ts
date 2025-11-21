import * as shared from "../../src/usecases/shared";
import { describe, it, expect } from "vitest";

describe("Shared UseCase Types", () => {
  it("loads without crashing", () => {
    expect(shared).toBeDefined();
  });
});
