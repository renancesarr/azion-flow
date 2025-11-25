import os from "node:os";
import process from "node:process";
import { TelemetryEvent } from "./event";

export function createEvent(event: string, payload?: Record<string, any>): TelemetryEvent {
  return {
    event,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.0.0",
    os: `${os.platform()}-${os.release()}`,
    node: process.version,
    payload
  };
}
