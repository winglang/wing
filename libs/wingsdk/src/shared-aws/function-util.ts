import * as cloud from "../cloud";

export function makeAwsLambdaHandler(
  handler: cloud.IFunctionHandler
): string[] {
  const inflightClient = handler._toInflight();
  const lines = new Array<string>();
  const client = "$handler";

  lines.push('"use strict";');
  lines.push(`var ${client} = undefined;`);
  lines.push("exports.handler = async function(event, context) {");
  lines.push("  try {");
  lines.push("    if (globalThis.$awsLambdaContext === undefined) {");
  lines.push("      globalThis.$awsLambdaContext = context;");
  lines.push(`      ${client} = ${client} ?? (${inflightClient});`);
  lines.push("    } else {");
  lines.push("      throw new Error(");
  lines.push("        'An AWS Lambda context object was already defined.'");
  lines.push("      );");
  lines.push("    }");

  // important: we're calling handle() within a try block, but there's no catch block
  // because we want to let the error propagate to the AWS Lambda runtime
  lines.push(
    `    return await ${client}.handle(event === null ? undefined : event);`
  );
  lines.push("  } finally {");
  lines.push("    globalThis.$awsLambdaContext = undefined;");
  lines.push("  }");
  lines.push("};");

  return lines;
}
