import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";

jest.setTimeout(100_000); // 100 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = `
async handle(event) {
  console.log("Hello, " + event);
  console.log("Wahoo!");
}`;

test("inflight uses a logger", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);

  new cloud.Function(app, "my_function", handler);

  const s = await app.startSimulator();

  const fnClient = s.getResource("/my_function") as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = "Alice";
  await fnClient.invoke(PAYLOAD);

  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("Logger has display hidden property set to true", async () => {
  // GIVEN
  const app = new SimApp();

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const logger = app.node.tryFindChild("WingLogger") as cloud.Logger;

  // THEN
  expect(logger.display.hidden).toEqual(true);
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    WingLogger: {
      display: {
        hidden: true,
      },
    },
  });
});

test("Logger has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const logger = app.node.tryFindChild("WingLogger") as cloud.Logger;

  // THEN
  expect(logger.display.title).toBeDefined();
  expect(logger.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    WingLogger: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
