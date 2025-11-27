import { describe, it, expect } from "vitest";
import { ApplicationService } from "../../../src/domains/application/application.service";

class MockApplicationProvider {
  async listApplications() {
    return [
      { id: "app-1", name: "demo" },
      { id: "app-2", name: "demo-2" }
    ];
  }
}

describe("ApplicationService integration", () => {
  it("should list and select applications", async () => {
    const service = new ApplicationService(new MockApplicationProvider());
    const apps = await service.listApplications();
    expect(apps.length).toBe(2);
    const selected = await service.selectApplication({ name: "demo-2" });
    expect(selected?.id).toBe("app-2");
  });
});
