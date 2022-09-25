import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import {
  init as initFunction,
  cleanup as cleanupFunction,
} from "../../src/sim/function.sim";

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
const SOURCE_CODE_LANGUAGE = "javascript";

test("invoke function", async () => {
  // GIVEN
  const { functionId } = await initFunction({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: {},
  });
  const fnClient = new FunctionClient(functionId);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
  await cleanupFunction(functionId);
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const { functionId } = await initFunction({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: {
      TEST_VAR_1: "test-value-1",
    },
  });
  const fnClient = new FunctionClient(functionId);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await fnClient.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Hello, ${PAYLOAD.name}! What's up?`,
  });
  await cleanupFunction(functionId);
});
