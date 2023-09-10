import { test, expect } from "vitest";
import { FunctionClient } from "../../src/shared-gcp/function.inflight";

test("invoke - happy path", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = "RESPONSE";

  //
  // WHEN
  const client = new FunctionClient();
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual(RESPONSE);
});
