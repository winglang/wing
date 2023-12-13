import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8 } from "@smithy/util-utf8";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import {
  FunctionClient,
  parseLogs,
} from "../../src/shared-aws/function.inflight";

const lambdaMock = mockClient(LambdaClient);

beforeEach(() => {
  lambdaMock.reset();
});

test("invoke - happy path", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = "RESPONSE";
  lambdaMock
    .on(InvokeCommand, {
      FunctionName: FUNCTION_NAME,
      Payload: fromUtf8(JSON.stringify(PAYLOAD)),
    })
    .resolves({
      StatusCode: 200,
      Payload: fromUtf8(JSON.stringify(RESPONSE)),
    });

  // WHEN
  const client = new FunctionClient(FUNCTION_NAME, "root/Function");
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual(RESPONSE);
});

test("invoke - sad path", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE_PAYLOAD = {
    errorType: "Error",
    errorMessage: "I don't like your input!",
    trace: [
      "Error: I don't like your input!",
      "    at Runtime.exports.handler (/var/task/index.js:3:11)",
      "    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1028:29)",
    ],
  };
  lambdaMock
    .on(InvokeCommand, {
      FunctionName: FUNCTION_NAME,
      Payload: fromUtf8(JSON.stringify(PAYLOAD)),
    })
    .resolves({
      StatusCode: 200,
      FunctionError: "Unhandled",
      Payload: fromUtf8(JSON.stringify(RESPONSE_PAYLOAD)),
    });

  // THEN
  const client = new FunctionClient("FUNCTION_NAME", "root/Function");
  await expect(client.invoke(PAYLOAD)).rejects.toThrow(
    /Invoke failed with message: "I don't like your input!"/
  );
});

test("parse logs", () => {
  const traces = parseLogs(
    "START RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f Version: $LATEST\n2023-08-04T16:40:47.309Z\t6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tINFO\thello world\n2023-08-04T16:40:50.691Z\t6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tINFO\thello world\nEND RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\nREPORT RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tDuration: 4958.93 ms\tBilled Duration: 4959 ms\tMemory Size: 128 MB\tMax Memory Used: 82 MB\tInit Duration: 249.40 ms\t\n",
    "fake-source"
  );
  expect(traces).toEqual([
    {
      data: { message: "hello world" },
      timestamp: "2023-08-04T16:40:47.309Z",
      sourceType: "@winglang/sdk.cloud.Function",
      sourcePath: "fake-source",
      type: "log",
    },
    {
      data: { message: "hello world" },
      timestamp: "2023-08-04T16:40:50.691Z",
      sourceType: "@winglang/sdk.cloud.Function",
      sourcePath: "fake-source",
      type: "log",
    },
  ]);
});
