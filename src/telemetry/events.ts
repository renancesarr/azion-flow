export const TelemetryEvents = {
  cliStarted: "cli_started",
  deployStarted: "deploy_started",
  deployFinished: "deploy_finished",
  deployError: "deploy_error",
  configLoaded: "config_loaded",
  stepsExecuted: "steps_executed"
} as const;

export type TelemetryEventName = (typeof TelemetryEvents)[keyof typeof TelemetryEvents];
