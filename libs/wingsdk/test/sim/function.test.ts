import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { init as initFunction } from "../../src/sim/function.sim";

const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
const SOURCE_CODE_LANGUAGE = "javascript";

test("invoke function", async () => {
  // GIVEN
  await initFunction();
  const client = new FunctionClient({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: {},
  });

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
});

test("invoke function with environment variables", async () => {
  // GIVEN
  await initFunction();
  const client = new FunctionClient({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: {
      TEST_VAR_1: "test-value-1",
    },
  });

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(JSON.stringify(PAYLOAD));

  // THEN
  expect(response).toEqual({
    msg: `Hello, ${PAYLOAD.name}! What's up?`,
  });
});
