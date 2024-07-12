import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud } from "@winglang/sdk";
import { sanitizeCode, awscdkSanitize, AwsCdkApp } from "./util";
import { lift } from "@winglang/sdk/lib/core";

test("default counter behavior", () => {
  const app = new AwsCdkApp();
  new cloud.Counter(app, "Counter");
  const output = app.synth();

  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::DynamoDB::Table",
    Match.objectLike({
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST",
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new AwsCdkApp();
  new cloud.Counter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::DynamoDB::Table",
    Match.objectLike({
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      BillingMode: "PAY_PER_REQUEST",
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new AwsCdkApp();
  const counter = new cloud.Counter(app, "Counter");
  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.INC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.inc(2);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::DynamoDB::Table", 1);
  template.resourceCountIs("AWS::IAM::Role", 1);
  template.resourceCountIs("AWS::IAM::Policy", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("inc() policy statement", () => {
  const app = new AwsCdkApp();
  const counter = new cloud.Counter(app, "Counter");

  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.INC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.inc(2);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::IAM::Policy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "dynamodb:UpdateItem",
          Effect: "Allow",
        }),
      ]),
    },
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new AwsCdkApp();
  const counter = new cloud.Counter(app, "Counter");

  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.DEC] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.dec(2);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::IAM::Policy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "dynamodb:UpdateItem",
          Effect: "Allow",
        }),
      ]),
    },
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new AwsCdkApp();
  const counter = new cloud.Counter(app, "Counter");

  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.PEEK] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.peek();
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::IAM::Policy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "dynamodb:GetItem",
          Effect: "Allow",
        }),
      ]),
    },
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("set() policy statement", () => {
  const app = new AwsCdkApp();
  const counter = new cloud.Counter(app, "Counter");

  const handler = lift({ my_counter: counter })
    .grant({ my_counter: [cloud.CounterInflightMethods.SET] })
    .inflight(async (ctx) => {
      const val = await ctx.my_counter.set(12);
      console.log(val);
    });

  new cloud.Function(app, "Function", handler);
  const output = app.synth();

  expect(sanitizeCode(handler._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties("AWS::IAM::Policy", {
    PolicyDocument: {
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "dynamodb:UpdateItem",
          Effect: "Allow",
        }),
      ]),
    },
  });
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
