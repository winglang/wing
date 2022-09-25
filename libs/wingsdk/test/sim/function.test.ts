import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { cleanup as cleanupFunction } from "../../src/sim/function.sim";
import * as testing from "../../src/testing";

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
const SOURCE_CODE_LANGUAGE = "javascript";

test("invoke function", async () => {
  // GIVEN
  const sim = await testing.Simulator.fromResources({
    resources: {
      my_function: {
        type: "wingsdk.cloud.Function",
        props: {
          sourceCodeFile: SOURCE_CODE_FILE,
          sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
          environmentVariables: {},
        },
      },
    },
  });
  const attrs = sim.getAttributes("my_function");
  const fnClient = new FunctionClient(attrs.functionId);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await cleanupFunction(attrs.functionId);
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const sim = await testing.Simulator.fromResources({
    resources: {
      my_function: {
        type: "wingsdk.cloud.Function",
        props: {
          sourceCodeFile: SOURCE_CODE_FILE,
          sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
          environmentVariables: {
            PIG_LATIN: "true",
          },
        },
      },
    },
  });
  const attrs = sim.getAttributes("my_function");
  const fnClient = new FunctionClient(attrs.functionId);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Ellohay, ${PAYLOAD.name}!`,
  });
  await cleanupFunction(attrs.functionId);
});
