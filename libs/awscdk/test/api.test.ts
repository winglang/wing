import { Match, Template } from "aws-cdk-lib/assertions";
import { test, expect } from "vitest";
import { simulator } from "@winglang/sdk";
import * as awscdk from "../src";
import { mkdtemp } from "@winglang/sdk/test/util";
import { awscdkSanitize } from "./util";
import { inflight } from "@winglang/sdk/lib/core";

const CDK_APP_OPTS = {
  stackName: "my-project",
  entrypointDir: __dirname,
};

const INFLIGHT_CODE = inflight(async () => "Hello, World");
const INFLIGHT_CODE_2 = inflight(async () => "Hello, Wing");

test("api with GET route at root", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/", INFLIGHT_CODE);
  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            get: {
              operationId: "get",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with multiple methods on same route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/", INFLIGHT_CODE);
  api.put("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            get: {
              operationId: "get",
            },
            put: {
              operationId: "put",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with GET routes with common prefix", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/hello/bat", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with GET routes with different prefix", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/foo/bar", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with multiple GET route and one lambda", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/hello/bat", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with multiple methods and multiple lambda", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.post("/hello/bat", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 2);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with multiple methods and one lambda", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.post("/hello/bat", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with path parameter", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/hello/:world", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with 'name' parameter", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/:name", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with 'name' & 'age' parameter", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.get("/:name/:age", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with POST route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.post("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            post: {
              operationId: "post",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with PUT route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.put("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            put: {
              operationId: "put",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with PATCH route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.patch("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            patch: {
              operationId: "patch",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with DELETE route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.delete("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            delete: {
              operationId: "delete",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with OPTIONS route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.options("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            options: {
              operationId: "options",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with HEAD route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.head("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            head: {
              operationId: "head",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api with CONNECT route", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");

  api.connect("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            connect: {
              operationId: "connect",
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api url can be used as environment variable", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api");
  new awscdk.Function(app, "Fn", INFLIGHT_CODE, {
    env: {
      API_URL: api.url,
    },
  });

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::Lambda::Function",
    Match.objectLike({
      Environment: {
        Variables: {
          API_URL: {},
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});

test("api configured for cors", () => {
  // GIVEN
  const app = new awscdk.App({ outdir: mkdtemp(), ...CDK_APP_OPTS });
  const api = new awscdk.Api(app, "Api", { cors: true });
  api.get("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const template = Template.fromJSON(JSON.parse(output));
  template.resourceCountIs("AWS::ApiGateway::RestApi", 1);
  template.resourceCountIs("AWS::Lambda::Function", 1);
  template.hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    Match.objectLike({
      Body: {
        paths: {
          "/": {
            get: {
              operationId: "get",
              responses: {
                "200": {
                  headers: {
                    "Access-Control-Allow-Headers": {
                      schema: {
                        type: "string",
                      },
                    },
                    "Access-Control-Allow-Methods": {
                      schema: {
                        type: "string",
                      },
                    },
                    "Access-Control-Allow-Origin": {
                      schema: {
                        type: "string",
                      },
                    },
                    "Access-Control-Max-Age": {
                      schema: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  );
  expect(awscdkSanitize(template)).toMatchSnapshot();
});
