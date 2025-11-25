import { error, info, success } from "./colors";

export function renderLoadingStart(label: string): string {
  const prefix = info("→");
  return `${prefix} ${label}...`;
}

export function renderLoadingSuccess(label: string): string {
  const prefix = success("✓");
  return `${prefix} ${label}`;
}

export function renderLoadingError(label: string): string {
  const prefix = error("✗");
  return `${prefix} ${label}`;
}
