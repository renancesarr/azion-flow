import type { AzionApplicationDto } from "./application/application.dto";
import { AzionHttpClient } from "./http/http-client";

const PATH_APPLICATIONS = "/workspace/applications";

export class AzionApplicationProvider {
  constructor(private readonly http = new AzionHttpClient()) {}

  async listApplications(): Promise<AzionApplicationDto[]> {
    const res = await this.http.request({ path: PATH_APPLICATIONS });
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }
}
