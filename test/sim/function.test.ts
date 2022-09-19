import * as path from "path";
import { FunctionClient } from "../../src/sim/function.inflight";
import { init as initFunction } from "../../src/sim/function.sim";

test("invoke function", async () => {
  // GIVEN
  const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
  const SOURCE_CODE_LANGUAGE = "javascript";
  const ENVIRONMENT_VARIABLES = {};
  const functionData = await initFunction({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: ENVIRONMENT_VARIABLES,
  });
  const client = new FunctionClient(functionData);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}!` });
});

test("invoke function with environment variables", async () => {
  // GIVEN
  const SOURCE_CODE_FILE = path.join(__dirname, "fixtures", "greeter.js");
  const SOURCE_CODE_LANGUAGE = "javascript";
  const ENVIRONMENT_VARIABLES = {
    TEST_VAR_1: "test-value-1",
  };
  const functionData = await initFunction({
    sourceCodeFile: SOURCE_CODE_FILE,
    sourceCodeLanguage: SOURCE_CODE_LANGUAGE,
    environmentVariables: ENVIRONMENT_VARIABLES,
  });
  const client = new FunctionClient(functionData);

  // WHEN
  const PAYLOAD = { name: "Alice" };
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual({ msg: `Hello, ${PAYLOAD.name}! What's up?` });
});
