export class ConfigStorageService {
  constructor(private readonly provider?: any) {}

  async loadConfig(): Promise<Record<string, any> | null> {
    if (this.provider?.loadConfig) {
      return (await this.provider.loadConfig()) ?? null;
    }
    return null;
  }

  async saveConfig(config: Record<string, any>): Promise<void> {
    if (this.provider?.saveConfig) {
      await this.provider.saveConfig(config);
    }
  }
}
