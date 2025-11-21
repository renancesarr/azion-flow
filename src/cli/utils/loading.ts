import { error, info, success } from "./colors";

const START_PREFIX = info("→");
const OK_PREFIX = success("✓");
const FAIL_PREFIX = error("✗");

export function renderLoadingStart(label: string): string {
  return `${START_PREFIX} ${label}...`;
}

export function renderLoadingSuccess(label: string): string {
  return `${OK_PREFIX} ${label}`;
}

export function renderLoadingError(label: string): string {
  return `${FAIL_PREFIX} ${label}`;
}
