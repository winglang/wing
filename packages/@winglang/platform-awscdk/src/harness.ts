import { readFile, rm } from "fs/promises";
import { ITestRunnerClient } from "@winglang/sdk/lib/std";
import { Util } from "@winglang/sdk/lib/util";
import { ITestHarness } from "@winglang/sdk/lib/platform";

export const WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK = "WingTestRunnerFunctionArns";

export class AwsCdkTestHarness implements ITestHarness {
  public async deploy(synthDir: string): Promise<ITestRunnerClient> {
    try {
      Util.exec("cdk", ["version", "--ci", "true"], { cwd: synthDir });
    } catch (err) {
      throw new Error(
        "AWS-CDK is not installed. Please install AWS-CDK to run tests in the cloud (npm i -g aws-cdk)."
      );
    }

    Util.exec("cdk", ["deploy", "--require-approval", "never", "--ci", "true", "-O", "./output.json", "--app", "."], {
      cwd: synthDir,
    })

    const stackName = process.env.CDK_STACK_NAME! + Util.sha256(synthDir).slice(-8);
    const testArns = await this.getFunctionArnsOutput(synthDir, stackName);

    const { TestRunnerClient } = await import("@winglang/sdk/lib/shared-aws/test-runner.inflight");
    const runner = new TestRunnerClient({ $tests: testArns });
    return runner;
  }

  public async cleanup(synthDir: string): Promise<void> {
    await rm(synthDir.concat("/output.json"));
    Util.exec("cdk", ["destroy", "-f", "--ci", "true", "--app", "."], { cwd: synthDir });

    await rm(synthDir, { recursive: true, force: true });
  }

  private async getFunctionArnsOutput(synthDir: string, stackName: string) {
    const file = await readFile(synthDir.concat("/output.json"));
    const parsed = JSON.parse(Buffer.from(file).toString());
    return parsed[stackName][WING_TEST_RUNNER_FUNCTION_IDENTIFIERS_AWSCDK];
  }
}
