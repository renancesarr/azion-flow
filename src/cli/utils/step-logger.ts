import { labelForStep } from "./step-labels";
import { renderLoadingError, renderLoadingStart, renderLoadingSuccess } from "./loading";
import type { StepLogger } from "../../usecases/deploy/types";

export function createCliStepLogger(silent: boolean): StepLogger | undefined {
  if (silent) return undefined;
  return {
    onStart: (step: string) => console.log(renderLoadingStart(labelForStep(step))),
    onSuccess: (step: string) => console.log(renderLoadingSuccess(labelForStep(step))),
    onError: (step: string, err: unknown) =>
      console.log(renderLoadingError(`${labelForStep(step)} (${(err as any)?.message ?? err})`))
  };
}
