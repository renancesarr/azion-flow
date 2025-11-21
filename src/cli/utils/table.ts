type TableRow = Array<string | number | boolean | null | undefined>;

function normalizeValue(value: TableRow[number]): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

export function renderTable(rows: TableRow[]): string {
  if (!rows.length) return "";

  const normalized = rows.map((row) => row.map(normalizeValue));
  const colCount = Math.max(...normalized.map((row) => row.length));
  const widths = Array.from({ length: colCount }, (_, col) =>
    Math.max(...normalized.map((row) => (row[col] ?? "").length))
  );

  const lines = normalized.map((row) =>
    row
      .map((cell, col) => {
        const value = cell ?? "";
        const width = widths[col];
        return value.padEnd(width, " ");
      })
      .join("  ")
  );

  return lines.join("\n");
}
