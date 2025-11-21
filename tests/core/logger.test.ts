import { describe, it, expect } from "vitest";
import * as logger from "../../src/core/logger/logger";
import * as consoleLogger from "../../src/core/logger/adapters/console-logger";

describe("Core Logger", () => {
  it("should load logger without crashing", () => {
    expect(logger).toBeDefined();
  });

  it("should load console logger adapter without crashing", () => {
    expect(consoleLogger).toBeDefined();
  });
});
