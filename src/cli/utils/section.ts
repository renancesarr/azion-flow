import { info, highlight } from "./colors";

export function section(title: string): string {
  return `${highlight("##")} ${info(title)}`;
}

export function subSection(title: string): string {
  return `${highlight("#")} ${title}`;
}

export function divider(): string {
  return "─".repeat(30);
}
