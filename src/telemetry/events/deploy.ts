import { appendEvent } from "../buffer";
import { createEvent } from "../create-event";
import { TelemetryEvents } from "../events";
import { isTelemetryEnabled } from "../telemetry.optin";

async function logDeploy(event: string, payload?: Record<string, any>) {
  if (!(await isTelemetryEnabled())) return;
  await appendEvent(createEvent(event, payload));
}

export async function logDeployStart(payload?: Record<string, any>) {
  await logDeploy(TelemetryEvents.deployStarted, payload);
}

export async function logDeployFinished(payload?: Record<string, any>) {
  await logDeploy(TelemetryEvents.deployFinished, payload);
}

export async function logDeployError(payload?: Record<string, any>) {
  await logDeploy(TelemetryEvents.deployError, payload);
}
