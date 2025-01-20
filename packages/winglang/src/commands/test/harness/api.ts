import { ITestRunnerClient } from "@winglang/sdk/lib/std";

export interface ITestHarness {
  deploy(synthDir: string): Promise<ITestRunnerClient>;
  cleanup(synthDir: string): Promise<void>;
}
