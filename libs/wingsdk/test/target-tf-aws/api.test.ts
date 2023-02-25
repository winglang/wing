import { Api } from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { tfResourcesOfCount } from "../util";
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
  expect(tfResourcesOfCount(output, "aws_api_gateway_rest_api")).toEqual(1);
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(1);
  expect(extractApiSpec(output)).toMatchSnapshot();
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
