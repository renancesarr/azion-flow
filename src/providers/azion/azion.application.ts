import type { AzionApplicationDto } from "./application/application.dto";
import { AzionHttpClient } from "./http/http-client";

export class AzionApplicationProvider {
  constructor(private readonly http = new AzionHttpClient()) {}

  async listApplications(): Promise<AzionApplicationDto[]> {
    const res = await this.http.request({ path: "/applications" });
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }
}
