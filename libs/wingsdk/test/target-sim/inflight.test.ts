import { Inflight } from "../../src/core";
import { SimApp, Testing } from "../../src/testing";
import { treeJsonOf } from "./util";

const INFLIGHT_CODE = `
async handle(event) {
  console.log("Hello, " + event);
  console.log("Wahoo!");
}`;

test("inflight has display hidden property set to true", async () => {
  // GIVEN
  const app = new SimApp();

  // WHEN
  Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
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
