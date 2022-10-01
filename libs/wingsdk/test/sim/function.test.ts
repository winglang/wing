import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { Simulator } from "../../src/testing/simulator";

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
const SOURCE_CODE_LANGUAGE = "javascript";

test("invoke function", async () => {
  // GIVEN
  const sim = await Simulator.fromTree({
    tree: {
      root: {
        type: "constructs.Construct",
        children: {
          my_function: {
            type: "wingsdk.cloud.Function",
            props: {
              sourceCodeFile: SOURCE_CODE_FILE,
              sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
              environmentVariables: {},
            },
          },
        },
      },
    },
  });
  const attrs = sim.getAttributes("root/my_function");
  const fnClient = new FunctionClient(attrs.functionAddr);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await sim.cleanup();
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const sim = await Simulator.fromTree({
    tree: {
      root: {
        type: "constructs.Construct",
        children: {
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
      },
    },
  });
  const attrs = sim.getAttributes("root/my_function");
  const fnClient = new FunctionClient(attrs.functionAddr);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Ellohay, ${PAYLOAD.name}!`,
  });
  await sim.cleanup();
});
