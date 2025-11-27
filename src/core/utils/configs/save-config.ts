export async function saveConfig(data: Record<string, any>, _provider?: { saveConfig?: (cfg: any) => Promise<void> }) {
  if (_provider?.saveConfig) {
    await _provider.saveConfig(data);
  }
}
