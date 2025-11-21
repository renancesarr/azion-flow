import { createDeployUseCase } from "../../usecases/deploy/deploy.factory";
import { labelForStep } from "../utils/step-labels";
import { renderLoadingError, renderLoadingStart, renderLoadingSuccess } from "../utils/loading";
import { renderTable } from "../utils/table";

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

  const stepLogger = flags.silent
    ? undefined
    : {
        onStart: (step: string) => console.log(renderLoadingStart(labelForStep(step))),
        onSuccess: (step: string) => console.log(renderLoadingSuccess(labelForStep(step))),
        onError: (step: string, err: unknown) =>
          console.log(renderLoadingError(`${labelForStep(step)} (${(err as any)?.message ?? err})`))
      };

  const usecase = createDeployUseCase({}, {}, stepLogger);
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
