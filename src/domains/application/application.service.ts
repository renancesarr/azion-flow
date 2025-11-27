type ApplicationRecord = { id?: string; name?: string };

export class ApplicationService {
  constructor(private readonly provider: any) {}

  async listApplications(): Promise<ApplicationRecord[]> {
    const list = (await this.provider?.listApplications?.()) ?? [];
    return list.map((app: any) => ({ id: app?.id ?? app?.name, name: app?.name ?? String(app?.id ?? "") })).filter((a: ApplicationRecord) => a.name);
  }

  async selectApplication(criteria: { id?: string; name?: string } = {}): Promise<ApplicationRecord | null> {
    const apps = await this.listApplications();
    if (criteria.id) {
      const match = apps.find((a) => a.id === criteria.id);
      if (match) return match;
    }
    if (criteria.name) {
      const match = apps.find((a) => a.name === criteria.name);
      if (match) return match;
    }
    return apps[0] ?? null;
  }
}
