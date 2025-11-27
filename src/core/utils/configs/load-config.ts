export async function loadConfig(_provider?: { loadConfig?: () => Promise<any> }): Promise<Record<string, any> | null> {
  if (_provider?.loadConfig) {
    const cfg = await _provider.loadConfig();
    return cfg ?? null;
  }
  return null;
}
