import { rm } from "fs/promises";
import { ITestHarness } from "../platform";
import { ITestRunnerClient } from "../std";
import { Util } from "../util";

export const WING_TEST_RUNNER_FUNCTION_IDENTIFIERS =
  "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS";

export interface TerraformTestHarnessOptions {
  readonly parallelism?: number;
  readonly clientModule: string;
}

export class TerraformTestHarness implements ITestHarness {
  private readonly options: TerraformTestHarnessOptions;
  private readonly parallelism: string;

  constructor(options: TerraformTestHarnessOptions) {
    this.options = options;
    this.parallelism = options.parallelism
      ? `-parallelism=${options.parallelism}`
      : "";
  }

  public async deploy(synthDir: string): Promise<ITestRunnerClient> {
    const opts = {
      cwd: synthDir,
      inheritEnv: true,
    };

    // Check if Terraform is installed
    const tfVersion = Util.exec("terraform", ["version"], opts);
    const installed = tfVersion.stdout.startsWith("Terraform v");
    if (!installed) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    Util.exec("terraform", ["init"], opts);
    Util.exec("terraform", ["apply", "-auto-approve", this.parallelism], opts);

    // Get the test runner function ARNs
    const output = Util.exec("terraform", ["output", "-json"], opts);

    const parsed = JSON.parse(output.stdout);
    const testArns = parsed[WING_TEST_RUNNER_FUNCTION_IDENTIFIERS]?.value;
    if (!testArns) {
      throw new Error(
        `terraform output ${WING_TEST_RUNNER_FUNCTION_IDENTIFIERS} not found`
      );
    }

    // Create the test runner client
    const { TestRunnerClient } = await import(this.options.clientModule);
    const runner = new TestRunnerClient({ $tests: testArns });
    return runner;
  }

  public async cleanup(synthDir: string): Promise<void> {
    try {
      Util.exec("terraform", ["destroy", "-auto-approve", this.parallelism], {
        cwd: synthDir,
        inheritEnv: true,
      });

      await rm(synthDir, { recursive: true, force: true });
    } catch (e) {
      console.error(e);
    }
  }
}
