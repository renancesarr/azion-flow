import type { AzionCredentialDto } from "./dto/credential.dto";
import { createCredentialUrl, listCredentialsUrl } from "../../core/http/endpoints";
import { AzionHttpClient } from "../../core/http/http-client";

export class AzionCredentialsProvider {
  private readonly http: AzionHttpClient;

  constructor(options: { token: string; http?: AzionHttpClient }) {
    this.http = options.http ?? new AzionHttpClient({ token: options.token });
  }

  async listCredentials(): Promise<AzionCredentialDto[]> {
    const res = await this.http.get(listCredentialsUrl());
    const results = (res.data as any)?.results ?? res.data ?? [];
    return Array.isArray(results) ? results : [];
  }

  async createCredential(payload: AzionCredentialDto): Promise<AzionCredentialDto> {
    const res = await this.http.post(createCredentialUrl(), payload);
    const data = (res.data as any)?.result ?? res.data ?? {};
    return {
      id: data.id,
      name: data.name ?? payload.name,
      type: data.type ?? payload.type,
      access_key: data.access_key,
      secret_key: data.secret_key
    };
  }
}
