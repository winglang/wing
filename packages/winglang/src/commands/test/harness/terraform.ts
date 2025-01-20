import { rm } from "fs/promises";
import { BuiltinPlatform, determineTargetFromPlatforms } from "@winglang/compiler";
import { ITestRunnerClient } from "@winglang/sdk/lib/std";
import { ITestHarness } from "./api";
import { withSpinner } from "../../../util";
import { TestOptions } from "../test";
import { execCapture } from "../util";

const ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS = "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS";
const PARALLELISM = { [BuiltinPlatform.TF_AZURE]: 5 };
const targetFolder: Record<string, string> = {
  [BuiltinPlatform.TF_AWS]: "shared-aws",
  [BuiltinPlatform.TF_AZURE]: "shared-azure",
  [BuiltinPlatform.TF_GCP]: "shared-gcp",
};

export class TerraformTestHarness implements ITestHarness {
  private readonly options: TestOptions;
  private readonly parallelism: string;

  constructor(options: TestOptions) {
    this.options = options;
    const p = PARALLELISM[options.platform[0]];
    this.parallelism = p ? `-parallelism=${p}` : "";
  }

  public async deploy(synthDir: string): Promise<ITestRunnerClient> {
    // Check if Terraform is installed
    const tfVersion = await execCapture("terraform version", { cwd: synthDir });
    const installed = tfVersion.startsWith("Terraform v");
    if (!installed) {
      throw new Error(
        "Terraform is not installed. Please install Terraform to run tests in the cloud."
      );
    }

    // Initialize Terraform
    await withSpinner("terraform init", () => execCapture("terraform init", { cwd: synthDir }));

    // Apply Terraform
    await withSpinner("terraform apply", () =>
      execCapture(`terraform apply -auto-approve ${this.parallelism}`, { cwd: synthDir })
    );

    // Get the test runner function ARNs
    const output = await execCapture("terraform output -json", { cwd: synthDir });
    const parsed = JSON.parse(output);
    const testArns = parsed[ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS]?.value;
    if (!testArns) {
      throw new Error(`terraform output ${ENV_WING_TEST_RUNNER_FUNCTION_IDENTIFIERS} not found`);
    }

    // Create the test runner client
    const target = determineTargetFromPlatforms(this.options.platform);
    const testRunnerPath = `@winglang/sdk/lib/${targetFolder[target]}/test-runner.inflight`;
    const { TestRunnerClient } = await import(testRunnerPath);
    const runner = new TestRunnerClient({ $tests: testArns });
    return runner;
  }

  public async cleanup(synthDir: string): Promise<void> {
    try {
      await withSpinner("terraform destroy", () =>
        execCapture(`terraform destroy -auto-approve ${this.parallelism}`, { cwd: synthDir })
      );

      await rm(synthDir, { recursive: true, force: true });
    } catch (e) {
      console.error(e);
    }
  }
}
