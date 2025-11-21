export interface CLICommand {
  name: string;
  run(args: string[]): Promise<void>;
}
