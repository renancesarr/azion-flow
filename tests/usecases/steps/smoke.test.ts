import { describe, it, expect } from "vitest";
import * as steps from "../../../src/usecases/deploy/steps";

describe("Deploy Steps", () => {
  it("should load without crashing", () => {
    expect(steps).toBeDefined();
  });
});
