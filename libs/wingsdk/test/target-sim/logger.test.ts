import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";
import { listMessages, treeJsonOf } from "./util";

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

test("Logger have display hidden property set to true", async () => {
  // GIVEN
  const app = new SimApp();

  // WHEN
  const treeJson = treeJsonOf(app.synth());

  // THEN
  const expected = {
    WingLogger: {
      display: {
        hidden: true,
      },
    },
  };
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).toMatchObject(expected);
});
