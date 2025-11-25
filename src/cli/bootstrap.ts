import { maybePromptTelemetry } from "../telemetry/startup";

export async function bootstrap(): Promise<void> {
  await maybePromptTelemetry();
}
