export interface DeployContext {}

export interface DeployResult {}

export type DeployStepCtor = new (services?: any, providers?: any) => { execute: (context: any) => Promise<void> };

export type StepLogger = {
  onStart?: (step: string) => void;
  onSuccess?: (step: string) => void;
  onError?: (step: string, err: unknown) => void;
};

export interface DeployRunResult {
  context: any;
  success: boolean;
}
