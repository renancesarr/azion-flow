import { createDeployUseCase } from "../../usecases/deploy/deploy.factory";

interface DeployFlags {
  json: boolean;
  debug: boolean;
  noColor: boolean;
}

function parseFlags(args: string[]): DeployFlags {
  return {
    json: args.includes("--json"),
    debug: args.includes("--debug"),
    noColor: args.includes("--no-color")
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

  const usecase = createDeployUseCase();
  const result = await usecase.execute({});

  if (flags.json) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`Deploy success: ${result.success}`);
  // eslint-disable-next-line no-console
  console.log(result.report);
}
