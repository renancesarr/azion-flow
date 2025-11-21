import { describe, it, expect } from "vitest";
import { ListApplicationsStep } from "../../src/usecases/deploy/steps/raw-steps/list-applications.step";
import { SelectApplicationStep } from "../../src/usecases/deploy/steps/raw-steps/select-application.step";

class MockApplicationService {
  async listApplications() {
    return [{ id: "app-1", name: "demo" }];
  }
  async selectApplication() {
    return { id: "app-1", name: "demo" };
  }
}

describe("Application steps real", () => {
  it("should list and select application", async () => {
    const services = { applicationService: new MockApplicationService() };
    const context: any = { report: {} };

    await new ListApplicationsStep(services).execute(context);
    expect(context.report.applications?.length).toBe(1);

    await new SelectApplicationStep(services).execute(context);
    expect(context.applicationId).toBe("app-1");
  });
});
