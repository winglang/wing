import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { cloud, simulator } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { sanitizeCode, awscdkSanitize } from "./util";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

test("default counter behavior", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
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
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
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
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::DynamoDB::Table", 1);
  template.resourceCountIs("AWS::IAM::Role", 2);
  template.resourceCountIs("AWS::IAM::Policy", 2);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("inc() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
  const val = await this.my_counter.dec(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.DEC],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
  const val = await this.my_counter.peek();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.PEEK],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("set() policy statement", () => {
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = simulator.Testing.makeHandler(`async handle(event) {
  const val = await this.my_counter.set();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.SET],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
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
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
