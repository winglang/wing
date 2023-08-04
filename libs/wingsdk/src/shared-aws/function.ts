import { PolicyStatement } from "./types";
import { Code } from "../core";
import { IInflightHost, TraceType } from "../std";
import { FUNCTION_TYPE } from "../target-sim/schema-resources";
import { Function as TfAwsFunction } from "../target-tf-aws";

/**
 * A shared interface for AWS functions.
 */
export interface IAwsFunction {
  /**
   * Add an environment variable to the function.
   */
  addEnvironment(key: string, value: string): void;

  /**
   * Add policy statements to the function's IAM role.
   *
   * TODO: update this to accept a variadic parameter (...policies)
   * https://github.com/winglang/wing/issues/397
   */
  addPolicyStatements(policies: PolicyStatement[]): void;
}

/**
 * A helper class for working with AWS functions.
 */
export class Function {
  /**
   * If the inflight host is an AWS function, return a helper interface for
   * working with it.
   * @param host The inflight host.
   */
  public static from(host: IInflightHost): IAwsFunction | undefined {
    if (host instanceof TfAwsFunction) {
      return host;
    }

    return undefined;
  }
}

/**
 * Generates the code lines for the cloud function,
 * overridden by the aws targets to have the function context too,
 * as well as collecting the logs as Traces and keeping them in context.logs for later use.
 * Eventually, this enables us displaying user defined logs, called in aws lambdas,
 * in the user's terminal while testing.
 * @param inflightClient inflight client code
 * @returns cloud function code string
 * @internal
 */
export function _generateAwsFunctionLines(inflightClient: Code): string[] {
  const lines = new Array<string>();

  lines.push("exports.handler = async function(event, context) {");
  lines.push(`
const $originalLog = console.log.bind({});

console.log = (...args) => {
const logs = args.map(item => ({
  data: { message: item },
  sourceType: "${FUNCTION_TYPE}",
  sourcePath: context?.clientContext?.constructPath,
  type: "${TraceType.LOG}",
  timestamp: new Date().toISOString()
}));
!context.logs ? context.logs = [...logs] : context.logs.push(...logs);

$originalLog(args);
};`);

  lines.push(
    `  return { payload: (await (${inflightClient.text}).handle(event)) ?? "", context };`
  );
  lines.push("};");

  return lines;
}
