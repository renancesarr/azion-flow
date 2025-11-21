import type { AzionApplicationDto } from "./application/application.dto";

export class AzionApplicationProvider {
  async listApplications(): Promise<AzionApplicationDto[]> {
    return [];
  }
}
