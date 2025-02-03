import { readFile, rm } from "fs/promises";
import { ITestRunnerClient } from "@winglang/sdk/std";
import { Util } from "@winglang/sdk/util";
import { ITestHarness } from "@winglang/sdk/platform";
import * as path from "path";

export const WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK =
  "WingTestRunnerFunctionArns";

const OUTPUT_FILE = "output.json";

export class AwsCdkTestHarness implements ITestHarness {
  public async deploy(synthDir: string): Promise<ITestRunnerClient> {
    const opts = {
      cwd: synthDir,
      inheritEnv: true,
    };
    try {
      Util.exec("cdk", ["version", "--ci", "true"], opts);
    } catch (err) {
      throw new Error(
        "AWS-CDK is not installed. Please install AWS-CDK to run tests in the cloud (npm i -g aws-cdk).",
      );
    }

    Util.exec(
      "cdk",
      [
        "deploy",
        "--require-approval",
        "never",
        "--ci",
        "true",
        "-O",
        OUTPUT_FILE,
        "--app",
        ".",
      ],
      opts,
    );

    const stackName =
      process.env.CDK_STACK_NAME! + Util.sha256(synthDir).slice(-8);
    const testArns = await this.getFunctionArnsOutput(synthDir, stackName);

    const { TestRunnerClient } = await import(
      "@winglang/sdk/shared-aws/test-runner.inflight"
    );
    return new TestRunnerClient({ $tests: testArns });
  }

  public async cleanup(synthDir: string): Promise<void> {
    await rm(path.join(synthDir, OUTPUT_FILE));
    Util.exec("cdk", ["destroy", "-f", "--ci", "true", "--app", "."], {
      cwd: synthDir,
      inheritEnv: true,
    });
    await rm(synthDir, { recursive: true, force: true });
  }

  private async getFunctionArnsOutput(synthDir: string, stackName: string) {
    const file = await readFile(path.join(synthDir, OUTPUT_FILE));
    const parsed = JSON.parse(Buffer.from(file).toString());
    return parsed[stackName][WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK];
  }
}
