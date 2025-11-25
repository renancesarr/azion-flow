import type { AzionApplicationDto } from "./application/application.dto";
import { listApplicationsUrl } from "./http/endpoints";
import { AzionHttpClient } from "./http/http-client";

export class AzionApplicationProvider {
  private readonly http: AzionHttpClient;

  constructor(options: { token: string; http?: AzionHttpClient }) {
    this.http = options.http ?? new AzionHttpClient({ token: options.token });
  }

  async listApplications(): Promise<AzionApplicationDto[]> {
    const res = await this.http.get(listApplicationsUrl());
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }
}
