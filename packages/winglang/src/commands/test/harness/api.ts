import { ITestRunnerClient } from "@winglang/sdk/lib/std";

/**
 * API for running wing tests.
 */
export interface ITestHarness {
  /**
   * Deploys the test program synthesized in the given directory and return an `ITestRunnerClient`
   * that can be used to run the tests.
   * @param synthDir - The directory containing the synthesized test program.
   */
  deploy(synthDir: string): Promise<ITestRunnerClient>;

  /**
   * Cleans up the test harness after the tests have been run.
   * @param synthDir - The directory containing the synthesized test program.
   */
  cleanup(synthDir: string): Promise<void>;
}
