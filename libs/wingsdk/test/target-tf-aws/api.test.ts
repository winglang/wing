import { test, expect } from "vitest";
import { inflight } from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { Api, Function } from "../../src/target-tf-aws";
import { mkdtemp, tfResourcesOfCount, tfSanitize } from "../util";

const INFLIGHT_CODE = inflight(async () => ({ body: "Hello, world" }));
const INFLIGHT_CODE_2 = inflight(async () => ({ body: "Hello, Wing!" }));

const extractApiSpec = (output: any) => {
  const jsonOutput = JSON.parse(output);
  const api = jsonOutput.resource.aws_api_gateway_rest_api as {
    body: string;
  }[];
  const body: string = Object.values(api)[0].body;
  return JSON.parse(body) as { paths: any };
};

test("api with GET route at root", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api will be private when vpc_api_gateway is true", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const parameters = app.parameters;
  parameters._rawParameters["tf-aws"] = {
    vpc: "new",
    vpc_api_gateway: true,
  };
  const api = new Api(app, "Api");

  // WHEN
  const output = app.synth();

  // THEN
  const parsedOutput = JSON.parse(output);

  const apiGatewayKey = Object.keys(
    parsedOutput.resource.aws_api_gateway_rest_api
  )[0];
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_vpc")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_vpc_endpoint")).toEqual(1);
  expect(
    parsedOutput.resource.aws_api_gateway_rest_api[apiGatewayKey]
      .endpoint_configuration.types[0]
  ).toEqual("PRIVATE");
  expect(
    parsedOutput.resource.aws_api_gateway_rest_api[apiGatewayKey]
      .endpoint_configuration.vpc_endpoint_ids.length
  ).toEqual(1); // uses vpc endpoint
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("api with multiple methods on same route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/", INFLIGHT_CODE);
  api.put("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(apiSpec).toMatchSnapshot();
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get", "put"]);
});

test("api with GET routes with common prefix", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/hello/bat", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with GET routes with different prefix", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/foo/bar", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple GET route and one lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.get("/hello/bat", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  // expect(tfResourcesOf(output)).toEqual(["aws_api_gateway_rest_api"]);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple methods and multiple lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.post("/hello/bat", INFLIGHT_CODE_2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple methods and one lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/foo", INFLIGHT_CODE);
  api.post("/hello/bat", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with path parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/hello/:world", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with 'name' parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/:name", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with 'name' & 'age' parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.get("/:name/:age", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with POST route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.post("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["post"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with PUT route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.put("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["put"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with PATCH route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.patch("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["patch"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with DELETE route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.delete("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["delete"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with OPTIONS route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.options("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["options"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with HEAD route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.head("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["head"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with CONNECT route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  api.connect("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["connect"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api url can be used as environment variable", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api");

  new Function(app, "Fn", INFLIGHT_CODE, {
    env: {
      API_URL: api.url,
    },
  });

  const output = app.synth();

  // THEN
  const tfConfig = JSON.parse(output);
  expect(
    tfConfig.resource.aws_lambda_function.Fn.environment.variables.API_URL
  ).toEqual(
    "https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}"
  );
});

test("api configured for cors", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const api = new Api(app, "Api", { cors: true });

  api.get("/", INFLIGHT_CODE);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get"]);
  expect(apiSpec).toMatchSnapshot();
});
