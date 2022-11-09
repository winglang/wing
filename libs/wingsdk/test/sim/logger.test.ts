import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { IFunctionClient, ILoggerClient } from "../../src/sim";
import { SimApp } from "./util";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  $cap.logger.print("Hello, " + event);
  $cap.logger.print("Wahoo!");
}`);

test("inflight uses a logger", async () => {
  // GIVEN
  const app = new SimApp();
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

  const s = await app.startSimulator();

  const fnClient = s.getResourceByPath("root/my_function") as IFunctionClient;
  const loggerClient = s.getResourceByPath("root/WingLogger") as ILoggerClient;

  // WHEN
  const PAYLOAD = "Alice";
  await fnClient.invoke(PAYLOAD);

  await sleep(200);

  // THEN
  const logs = await loggerClient.fetchLatestLogs();
  expect(logs).toEqual([
    {
      message: `Hello, ${PAYLOAD}`,
      timestamp: expect.any(Number),
    },
    {
      message: `Wahoo!`,
      timestamp: expect.any(Number),
    },
  ]);
  expect(s.tree).toMatchSnapshot();

  await s.stop();
});
