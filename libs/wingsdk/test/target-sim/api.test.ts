import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { ApiAttributes } from "../../src/target-sim/schema-resources";
import { SimApp, Testing } from "../../src/testing";

const INFLIGHT_CODE = (body: string) =>
  `async handle(req) { return { status: 200, body: "${body}" }; }`;

test("create an api", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Api._newApi(app, "my_api");

  // THEN
  const s = await app.startSimulator();
  expect(s.getResourceConfig("/my_api")).toEqual({
    attrs: {
      handle: expect.any(String),
      url: expect.any(String),
    },
    path: "root/my_api",
    props: {
      routes: [],
    },
    type: "wingsdk.cloud.Api",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("api with one GET route", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const RESPONSE = "boom";

  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE(RESPONSE));
  api.get(ROUTE, inflight);

  // WHEN
  const s = await app.startSimulator();

  const apiAttrs = s.getResourceConfig("/my_api").attrs as ApiAttributes;
  const apiUrl = apiAttrs.url;

  // WHEN
  const response = await fetch(apiUrl + ROUTE, { method: "GET" });

  // THEN
  await s.stop();

  expect(response.status).toEqual(200);
  expect(await response.text()).toEqual(RESPONSE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("api with multiple methods on same route", async () => {
  // GIVEN
  const ROUTE = "/hello";
  const GET_RESPONSE = "boom";
  const POST_RESPONSE = "bang";
  const app = new SimApp();
  const api = cloud.Api._newApi(app, "my_api");
  const inflightGet = Testing.makeHandler(
    app,
    "Handler1",
    INFLIGHT_CODE(GET_RESPONSE)
  );
  const inflightPost = Testing.makeHandler(
    app,
    "Handler2",
    INFLIGHT_CODE(POST_RESPONSE)
  );
  api.get(ROUTE, inflightGet);
  api.post(ROUTE, inflightPost);

  // WHEN
  const s = await app.startSimulator();

  const apiAttrs = s.getResourceConfig("/my_api").attrs as ApiAttributes;
  const apiUrl = apiAttrs.url;

  // WHEN
  const getResponse = await fetch(`${apiUrl}${ROUTE}`, { method: "GET" });
  const postResponse = await fetch(`${apiUrl}${ROUTE}`, { method: "POST" });

  // THEN
  await s.stop();

  expect(getResponse.status).toEqual(200);
  expect(await getResponse.text()).toEqual(GET_RESPONSE);

  expect(postResponse.status).toEqual(200);
  expect(await postResponse.text()).toEqual(POST_RESPONSE);

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});
