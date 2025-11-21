import { describe, it, expect } from "vitest";
import { GenerateReportStep } from "../../src/usecases/deploy/steps/raw-steps/generate-report.step";

describe("Report step real", () => {
  it("should generate timestamp", async () => {
    const context: any = { report: {} };
    await new GenerateReportStep({}).execute(context);
    expect(typeof context.report.generatedAt).toBe("string");
  });
});
