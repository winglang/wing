import { test, expect, vi, afterEach } from "vitest";
import { Util as http } from "../../src/http";
import { FunctionClient } from "../../src/shared-azure/function.inflight";

afterEach(() => {
  vi.clearAllMocks();
});

test("invoke with successful response", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = "RESPONSE";

  const post = vi.spyOn(http, "post").mockResolvedValue({
    body: RESPONSE,
    status: 200,
    ok: true,
    headers: {},
    url: "",
  });

  // WHEN
  const client = new FunctionClient({ $functionName: FUNCTION_NAME });
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(post).toBeCalledTimes(1);
  expect(response).toEqual(RESPONSE);
});

test("invoke with unsuccessful response", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const ERROR = `Error while invoking the function ${FUNCTION_NAME}:\nexpected test error`;

  vi.spyOn(http, "post").mockResolvedValue({
    body: "expected test error",
    status: 500,
    ok: false,
    headers: {},
    url: "",
  });
  // THEN
  const client = new FunctionClient({ $functionName: FUNCTION_NAME });

  await expect(() => client.invoke(PAYLOAD)).rejects.toThrowError(ERROR);
});
