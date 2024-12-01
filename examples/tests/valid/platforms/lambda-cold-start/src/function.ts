
import * as cdktf from "@cdktf/provider-aws";
import {
  type FunctionProps,
  type IFunctionHandler,
} from "@winglang/sdk/lib/cloud";
import { type PolicyStatement } from "@winglang/sdk/lib/shared-aws";
import { Function } from "@winglang/sdk/lib/target-tf-aws/function.js";
import * as cdkfLib from "cdktf";
import type { Construct } from "constructs";

export class CustomFunction extends Function {
  lines: string[];
  statements: {
    actions?: string[];
    resources?: string[];
    effect?: string;
  }[] = [];
  statementsCount = 0;
  constructor(
    lines: string[],
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
    props?: FunctionProps,
  ) {
    super(scope, id, inflight, props);
    this.lines = lines;
    new cdktf.iamRolePolicy.IamRolePolicy(this, "IamRolePolicy-initial", {
      role: (this as any).role.name,
      policy: cdkfLib.Lazy.stringValue({
        produce: () => {
          if (this.statements.length > 0) {
            return JSON.stringify({
              Version: "2012-10-17",
              Statement: this.statements.map((s) => ({
                Effect: s.effect,
                Action: s.actions,
                Resource: s.resources,
              })),
            });
          }
          // policy must contain at least one statement, so include a no-op statement
          return JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: "none:null",
                Resource: "*",
              },
            ],
          });
        },
      }),
    });
  }

  public addEnvironment(name: string, value: string) {
    (this as any)._env[name] = value;
  }

  public addPolicyStatements(...statements: PolicyStatement[]) {
    for (const statement of statements) {
      const policyStatement = {
        actions: statement.actions,
        resources: statement.resources,
        effect: statement.effect ?? "Allow",
      };
      this.statements.push(policyStatement);
      if (this.statements.length > 20) {
        const statements = this.statements.splice(0, 20);
        const count = this.statementsCount++;
        const document =
          new cdktf.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument(
            this,
            `IamRolePolicyDocument${count}`,
            {
              statement: statements,
            },
          );
        const policy = new cdktf.iamPolicy.IamPolicy(
          this,
          `IamRolePolicy${count}`,
          {
            policy: document.json,
          },
        );
        new cdktf.iamRolePolicyAttachment.IamRolePolicyAttachment(
          this,
          `IamRolePolicyAttachment${count}`,
          {
            role: (this as any).role.name,
            policyArn: policy.arn,
          },
        );
      }
    }
  }

  protected _getCodeLines(handler: IFunctionHandler): string[] {
    const inflightClient = handler._toInflight();
    const lines = new Array<string>();
    const client = "$handler";
    lines.push('"use strict";');
    lines.push(`var $handlers = {};`);
    lines.push(...this.lines);
    lines.push(`var ${client} = undefined;`);
    lines.push("exports.handler = async function(event) {");
    lines.push(`  ${client} = ${client} ?? (${inflightClient});`);
    lines.push(`  return await ${client}.handle(event);`);
    lines.push("};");
    return lines;
  }
}
