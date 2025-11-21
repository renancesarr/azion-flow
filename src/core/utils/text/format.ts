export function trimText(value?: string): string | undefined {
  if (typeof value !== "string") return value;
  return value.trim();
}

export function normalizeText(value?: string): string | undefined {
  if (typeof value !== "string") return value;
  return value.normalize();
}
