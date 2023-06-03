import { readFileSync, writeFileSync } from "fs";
import { Bundle, createBundle } from "../shared/bundling";
import { Duration } from "../std";

export const createAwsBundle = (
  entrypoint: string,
  memoization?: Duration
): Bundle => {
  if (memoization) {
    const lines = new Array<string>();
    lines.push('const { createHash } = require("crypto");');
    lines.push(
      'const { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");'
    );
    lines.push(
      'const { marshall, unmarshall  } = require("@aws-sdk/util-dynamodb");'
    );
    lines.push(
      "const client = new DynamoDBClient({ region: process.env.AWS_REGION });"
    );
    lines.push("Date.prototype.addSeconds = function(s) {");
    lines.push("  return this.setSeconds(this.getSeconds() + s);");
    lines.push("};");
    if (memoization) {
      lines.push(`const expiration = ${memoization.seconds};`);
    }
    lines.push("const getIdempotencyItem = async function(input) {");
    lines.push(
      '  const hash = createHash("sha256").update(input).digest("hex");'
    );
    lines.push("  const getItem = {");
    lines.push(`      TableName: process.env.MEMOIZATION_TABLE,`);
    lines.push("      Key: marshall({ id: hash }),");
    lines.push("  };");
    lines.push("  const command = new GetItemCommand(getItem);");
    lines.push("  const result = await client.send(command);");
    lines.push(
      "  const currentTime = Math.floor(new Date().getTime() / 1000);"
    );
    lines.push(
      "  if (result.Item && currentTime < parseInt(result.Item.expiration.N)) {"
    );
    lines.push("    console.log(result);");
    lines.push("    return unmarshall(result.Item);");
    lines.push("  }");
    lines.push("  return undefined;");
    lines.push("");
    lines.push("};");
    lines.push("const putIdempotencyItem = async function(input) {");
    lines.push(
      '  const hash = createHash("sha256").update(input).digest("hex");'
    );
    lines.push("  let item = {");
    lines.push("    id: hash,");
    lines.push('    status: "IN_PROGRESS",');
    if (memoization) {
      lines.push(
        "    expiration: Math.floor(new Date().addSeconds(expiration) / 1000),"
      );
    }
    lines.push("  };");
    lines.push("  const putItem = {");
    lines.push(`      TableName: process.env.MEMOIZATION_TABLE,`);
    lines.push("      Item: marshall(item),");
    lines.push("  }");
    lines.push("  const command = new PutItemCommand(putItem);");
    lines.push("  await client.send(command);");
    lines.push("};");
    lines.push("const updateIdempotencyItem = async function(input, output) {");
    lines.push(
      '  const hash = createHash("sha256").update(input).digest("hex");'
    );
    lines.push("  const updateItem = {");
    lines.push(`      TableName: process.env.MEMOIZATION_TABLE,`);
    lines.push("      Key: marshall({ id: hash }),");
    lines.push(
      `      UpdateExpression: "set #status = :status, #output = :output",`
    );
    lines.push(
      `      ExpressionAttributeValues: marshall({ ":status": "COMPLETE", ":output": output }),`
    );
    lines.push(
      `      ExpressionAttributeNames: { "#status": "status", "#output": "output" },`
    );
    lines.push("  };");
    lines.push("  const command = new UpdateItemCommand(updateItem);");
    lines.push("  await client.send(command);");
    lines.push("};");
    lines.push("const deleteIdempotencyItem = async function(input) {");
    lines.push(
      '  const hash = createHash("sha256").update(input).digest("hex");'
    );
    lines.push("  const deleteItem = {");
    lines.push(`      TableName: process.env.MEMOIZATION_TABLE,`);
    lines.push("      Key: marshall({ id: hash }),");
    lines.push("  };");
    lines.push("  const command = new DeleteItemCommand(deleteItem);");
    lines.push("  await client.send(command);");
    lines.push("};");

    var data = readFileSync(entrypoint).toString().split("\n");
    data.splice(0, 0, lines.join("\n"));
    writeFileSync(entrypoint, data.join("\n"));
    // bundled code is guaranteed to be in a fresh directory
    return createBundle(entrypoint, undefined, [
      "@aws-sdk/client-dynamodb",
      "@aws-sdk/util-dynamodb",
    ]);
  }
  // bundled code is guaranteed to be in a fresh directory
  return createBundle(entrypoint);
};
