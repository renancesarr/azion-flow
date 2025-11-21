export interface HttpRequest {
  path: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  baseUrl?: string;
}

export interface HttpResponse {
  status: number;
  data: unknown;
  headers: Record<string, string>;
}
