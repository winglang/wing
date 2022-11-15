import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  $cap.logger.print("Hello, " + event);
  $cap.logger.print("Wahoo!");
}`);

test("inflight uses a logger", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  cloud.Logger.register(app);
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
    captures: {
      logger: {
        resource: cloud.Logger.of(app),
        methods: [cloud.LoggerInflightMethods.PRINT],
      },
    },
  });
  new cloud.Function(app, "my_function", handler);
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const fnClient = s.getResourceByPath(
    "root/my_function"
  ) as cloud.IFunctionClient;

  // WHEN
  const PAYLOAD = "Alice";
  await fnClient.invoke(PAYLOAD);

  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Function created.",
    "Hello, Alice",
    "Print operation succeeded.",
    "Wahoo!",
    "Print operation succeeded.",
    'Invoke (payload="Alice") operation succeeded. Response: undefined',
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

function listMessages(s: testing.Simulator) {
  return s.listEvents().map((event) => event.message);
}
