import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { ApiAttributes } from "../../src/target-sim/schema-resources";
import { SimApp, Simulator, Testing } from "../../src/testing";

const INFLIGHT_CODE = `async handle(name) { return { status: 200, body: "boom" }; }`;

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

test(
  "api with one GET route",
  async () => {
    // GIVEN
    const ROUTE = "/hello";
    const app = new SimApp();
    const api = cloud.Api._newApi(app, "my_api");
    const inflight = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
    api.get(ROUTE, inflight);

    // WHEN
    const s = await app.startSimulator();

    const apiAttrs = s.getResourceConfig("/my_api").attrs as ApiAttributes;
    const apiUrl = apiAttrs.url;

    // WHEN
    const response = await fetch(apiUrl + ROUTE, {
      method: "GET",
    });

    // THEN
    await s.stop();

    expect(response.status).toEqual(200);
    expect(await response.text()).toEqual("boom");

    expect(listMessages(s)).toMatchSnapshot();
    expect(app.snapshot()).toMatchSnapshot();
  },
  {
    timeout: 1000 * 60 * 5,
  }
);
