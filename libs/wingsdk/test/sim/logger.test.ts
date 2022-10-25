import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { FunctionClient } from "../../src/sim/function.inflight";
import * as testing from "../../src/testing";
import { simulatorJsonOf, synthSimulatedApp } from "./util";

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, event) {
  const msg = "Hello, " + event;
  $cap.logger.print(msg);
  return { msg };
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

  const attrs = s.getAttributes("root/my_function");
  const fnClient = new FunctionClient(attrs.functionAddr);

  // WHEN
  const PAYLOAD = "Alice";
  const response = await fnClient.invoke(PAYLOAD);

  // THEN
  // TODO: assert that the logger was invoked?
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD}` });
  await s.stop();

  expect(simulatorJsonOf(appPath)).toMatchSnapshot();
});
