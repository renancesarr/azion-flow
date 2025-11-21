import { AZION_API_BASE } from "./endpoints";
import type { HttpRequest, HttpResponse } from "./types";

export class AzionHttpClient {
  token?: string;

  async request(_req: HttpRequest): Promise<HttpResponse> {
    // Placeholder HTTP request. Integrate real fetch/axios in fase posterior.
    return { base: AZION_API_BASE } as HttpResponse;
  }
}
