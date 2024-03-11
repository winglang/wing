import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator, ex } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize, CDK_APP_OPTS } from "./util";

test("default dynamodb table behavior", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  new ex.DynamodbTable(app, "Table", {
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
  const table = new ex.DynamodbTable(app, "Table", {
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
    name: "my-wing-table",
  });
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
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
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::Logs::LogGroup", 1);
  template.hasResource("AWS::DynamoDB::Table", 1);
  template.hasResource("AWS::IAM::Role", 1);
  template.hasResource("AWS::IAM::Policy", 1);
  template.hasResource("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
