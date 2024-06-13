import { test, expect, vi, afterEach } from "vitest";
import { Util as http } from "../../src/http";
import { FunctionClient } from "../../src/shared-azure/function.inflight";
import { Json } from "../../src/std";

afterEach(() => {
  vi.clearAllMocks();
});

test("invoke with successful response", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = "RESPONSE";

  const globalFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
    status: 200,
    ok: true,
    text: async () => RESPONSE,
    json: async () => RESPONSE,
  } as any);

  // WHEN
  const client = new FunctionClient(FUNCTION_NAME);
  const response = await client.invoke(Json._fromAny(PAYLOAD));

  // THEN
  expect(globalFetch).toBeCalledTimes(1);
  expect(response).toEqual(RESPONSE);
});

test("invoke with unsuccessful response", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const ERROR = `Error while invoking the function ${FUNCTION_NAME}:\nexpected test error`;

  const globalFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
    status: 200,
    ok: false,
    text: async () => ERROR,
    json: async () => ERROR,
  } as any);

  // THEN
  const client = new FunctionClient(FUNCTION_NAME);

  await expect(() =>
    client.invoke(Json._fromAny(PAYLOAD))
  ).rejects.toThrowError(ERROR);
});
