import { test, expect } from "vitest";
import * as tfaws from "../../src/target-tf-aws";
import { Api, Function } from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, tfResourcesOfCount } from "../util";

const INFLIGHT_CODE = `async handle(name) { return "Hello, World"; }`;
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/", inflight);

  const output = app.synth();

  // THEN
  const apiSpec = extractApiSpec(output);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get"]);
  expect(apiSpec).toMatchSnapshot();
});

test("api with multiple methods on same route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/", inflight);
  api.put("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const inflight2 = Testing.makeHandler(app, "Handler2", INFLIGHT_CODE);

  api.get("/hello/foo", inflight);
  api.get("/hello/bat", inflight2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with GET routes with different prefix", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const inflight2 = Testing.makeHandler(app, "Handler2", INFLIGHT_CODE);

  api.get("/hello/foo", inflight);
  api.get("/foo/bar", inflight2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple GET route and one lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/hello/foo", inflight);
  api.get("/hello/bat", inflight);

  const output = app.synth();

  // THEN
  // expect(tfResourcesOf(output)).toEqual(["aws_api_gateway_rest_api"]);
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple methods and multiple lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const inflight2 = Testing.makeHandler(app, "Handler2", INFLIGHT_CODE);

  api.get("/hello/foo", inflight);
  api.post("/hello/bat", inflight2);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with multiple methods and one lambda", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/hello/foo", inflight);
  api.post("/hello/bat", inflight);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with path parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/hello/{world}", inflight);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with 'name' parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/{name}", inflight);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with 'name' & 'age' parameter", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.get("/{name}/{age}", inflight);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
});

test("api with POST route", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.post("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.put("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.patch("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.delete("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.options("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.head("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");

  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  api.connect("/", inflight);

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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const api = new Api(app, "Api");
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  new Function(app, "Fn", handler, {
    env: {
      API_URL: api.url,
    },
  });

  const output = app.synth();

  // THEN
  const tfConfig = JSON.parse(output);
  expect(
    tfConfig.resource.aws_lambda_function.Fn.environment.variables.API_URL
  ).toEqual("${aws_api_gateway_stage.Api_api_stage_E0FA39D6.invoke_url}");
});
