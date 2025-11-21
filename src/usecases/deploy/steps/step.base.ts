export abstract class DeployStepBase {
  abstract execute(context: any): Promise<void>;
}
