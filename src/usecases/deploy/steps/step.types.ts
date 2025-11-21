export interface DeployStep {
  execute(context: any): Promise<void>;
}
