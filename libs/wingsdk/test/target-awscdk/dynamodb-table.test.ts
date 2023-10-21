import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as ex from "../../src/ex";
import { Testing } from "../../src/simulator";
import * as awscdk from "../../src/target-awscdk";
import { mkdtemp, awscdkSanitize } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default dynamodb table behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  ex.DynamodbTable._newDynamodbTable(app, "Table", {
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
    name: "my-wing-table",
  });
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResource("AWS::DynamoDB::Table", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("function with a table binding", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const table = ex.DynamodbTable._newDynamodbTable(app, "Table", {
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
    name: "my-wing-table",
  });
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  await this.my_table.putItem({ item: { id: "test" } });
  await this.my_table.scan();
}`,
    {
      my_table: {
        obj: table,
        ops: [
          ex.DynamodbTableInflightMethods.PUT_ITEM,
          ex.DynamodbTableInflightMethods.SCAN,
        ],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  const template = Template.fromJSON(JSON.parse(output));
  template.hasResource("Custom::LogRetention", 1);
  template.hasResource("AWS::DynamoDB::Table", 1);
  template.hasResource("AWS::IAM::Role", 2);
  template.hasResource("AWS::IAM::Policy", 2);
  // 1 inflight function and 1 log retention function
  template.hasResource("AWS::Lambda::Function", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
