import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getToken, setToken } from "../../providers/azion/http/token-store";
import { AzionHttpClient } from "../../providers/azion/http/http-client";

async function validateToken(token: string): Promise<boolean> {
  try {
    const http = new AzionHttpClient({ token, fetchImpl: globalThis.fetch as any });
    await http.request({ path: "/workspace/applications" }); // chamada leve para validar auth
    return true;
  } catch {
    return false;
  }
}

export async function promptTokenIfNeeded(): Promise<void> {
  if (getToken()) return;

  const rl = readline.createInterface({ input, output });
  const token = await rl.question("Informe seu AZION_TOKEN: ");
  rl.close();

  const ok = await validateToken(token);
  if (!ok) {
    throw new Error("AZION_TOKEN inválido. Verifique e tente novamente.");
  }
  setToken(token);
}

export function setTokenDirect(token?: string) {
  if (token) {
    setToken(token.trim());
  }
}
