import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { Counter, Function, CounterInflightMethods } from "../../src/cloud";
import * as awscdk from "../../src/target-awscdk";
import { Testing } from "../../src/testing";
import { sanitizeCode, mkdtemp } from "../util";

const CDK_APP_OPTS = {
  stackName: "my-project",
};

test("default counter behavior", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Counter._newCounter(app, "Counter");
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  Counter._newCounter(app, "Counter", {
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.INC],
      },
    }
  );
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::DynamoDB::Table", 1);
  template.resourceCountIs("AWS::IAM::Role", 1);
  template.resourceCountIs("AWS::IAM::Policy", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(template.toJSON()).toMatchSnapshot();
});

test("inc() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.INC],
      },
    }
  );
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.dec(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.DEC],
      },
    }
  );
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.peek();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.PEEK],
      },
    }
  );
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
  expect(template.toJSON()).toMatchSnapshot();
});

test("reset() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = Counter._newCounter(app, "Counter");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  const val = await this.my_counter.reset();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.RESET],
      },
    }
  );
  Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
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
  expect(template.toJSON()).toMatchSnapshot();
});
