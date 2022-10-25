import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { FunctionClient } from "../../src/sim/function.inflight";
import { LoggerClient } from "../../src/sim/logger.inflight";
import * as testing from "../../src/testing";
import { simulatorJsonOf, synthSimulatedApp } from "./util";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  $cap.logger.print("Hello, " + event);
  $cap.logger.print("Wahoo!");
}`);

test("inflight uses a logger", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    cloud.Logger.register(scope);
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
      captures: {
        logger: {
          resource: cloud.Logger.of(scope),
          methods: [cloud.LoggerInflightMethods.PRINT],
        },
      },
    });
    new cloud.Function(scope, "my_function", handler);
  });
  const s = new testing.Simulator({ appPath });
  await s.start();

  const fnAttrs = s.getAttributes("root/my_function");
  const fnClient = new FunctionClient(fnAttrs.functionAddr);

  const loggerAttrs = s.getAttributes("root/WingLogger");
  const loggerClient = new LoggerClient(loggerAttrs.loggerAddr, "my_function");

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
  expect(simulatorJsonOf(appPath)).toMatchSnapshot();

  await s.stop();
});
