export type TelemetryEvent = {
  event: string;
  timestamp: string;
  version: string;
  os: string;
  node: string;
  payload?: Record<string, any>;
};
