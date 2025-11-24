type FriendlyError = {
  message: string;
  hints?: string[];
};

export function formatError(err: unknown): FriendlyError {
  const raw = (err as any)?.message ?? String(err);
  const hints: string[] = [];

  if (raw.toLowerCase().includes("token")) {
    hints.push("Verifique se o AZION_TOKEN foi informado e é válido.");
  }
  if (raw.toLowerCase().includes("network")) {
    hints.push("Cheque sua conexão de rede ou tente novamente em instantes.");
  }
  if (raw.toLowerCase().includes("not found")) {
    hints.push("Valide paths, buckets ou aplicações informados.");
  }

  return { message: raw, hints };
}
