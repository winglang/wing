import { test, expect } from "vitest";
import { treeJsonOf } from "./util";
import { Inflight } from "../../src/core";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

const INFLIGHT_CODE = `
async handle(event) {
  console.log("Hello, " + event);
  console.log("Wahoo!");
}`;

test("inflight has display hidden property set to true", async () => {
  // GIVEN
  const app = new SimApp();
  Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const inflight = app.node.tryFindChild("Handler") as Inflight;

  // THEN
  expect(inflight.display.hidden).toEqual(true);
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    Handler: {
      display: {
        hidden: true,
      },
    },
  });
});

test("inflight has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const inflight = app.node.tryFindChild("Handler") as Inflight;

  // THEN
  expect(inflight.display.title).toBeDefined();
  expect(inflight.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    Handler: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
