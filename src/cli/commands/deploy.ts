import { createDeployUseCase } from "../../usecases/deploy/deploy.factory";
import { renderTable } from "../utils/table";
import { createCliStepLogger } from "../utils/step-logger";
import { promptTokenIfNeeded } from "../utils/token-prompt";
import { getToken } from "../../providers/azion/http/token-store";

interface DeployFlags {
  json: boolean;
  debug: boolean;
  noColor: boolean;
  silent: boolean;
}

function parseFlags(args: string[]): DeployFlags {
  return {
    json: args.includes("--json"),
    debug: args.includes("--debug"),
    noColor: args.includes("--no-color"),
    silent: args.includes("--silent")
  };
}

export async function deployCommand(args: string[]): Promise<void> {
  const flags = parseFlags(args);
  if (flags.debug) {
    process.env.AZION_FLOW_DEBUG = "1";
  }
  if (flags.noColor) {
    process.env.NO_COLOR = "1";
  }
  if (flags.noColor) {
    process.env.NO_COLOR = "1";
  }

  await promptTokenIfNeeded();
  const token = getToken();
  if (!token) {
    throw new Error("AZION_TOKEN ausente após o prompt; não é possível prosseguir com o deploy.");
  }
  const stepLogger = createCliStepLogger(flags.silent);

  const usecase = createDeployUseCase({ services: {}, providers: {}, stepLogger, token });
  const result = await usecase.execute({});

  if (flags.json) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Deploy success: ${result.success}`);
  printReportSummary(result.report);
}

function printReportSummary(report: any): void {
  const summaryRows = [
    ["Bucket", report?.bucket?.name ?? "n/a"],
    ["App", report?.selectedApplication?.name ?? report?.applicationId ?? "n/a"],
    ["Domain", report?.domain?.domain ?? report?.domainConfig?.domain ?? "n/a"],
    ["Uploaded", report?.sync?.uploaded ?? 0],
    ["Skipped", report?.sync?.skipped ?? 0]
  ];

  const timings = report?.timings ?? {};
  const timingRows = Object.entries(timings).map(([step, ms]) => [labelForStep(step), `${ms} ms`]);

  const lines = [
    "Resumo do deploy",
    renderTable(summaryRows),
    timingRows.length ? "\nTempos por step" : "",
    timingRows.length ? renderTable(timingRows) : ""
  ].filter(Boolean);

  console.log(lines.join("\n"));
}
