import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8 } from "@aws-sdk/util-utf8-node";
import { mockClient } from "aws-sdk-client-mock";
import { test, expect, beforeEach } from "vitest";
import { FunctionClient } from "../../src/shared-aws/function.inflight";

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
  const client = new FunctionClient(FUNCTION_NAME);
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual(RESPONSE);
});

test("invoke - happy path - response number", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = 123;
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
  const client = new FunctionClient(FUNCTION_NAME);
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual(RESPONSE);
});

test("invoke - happy path - response json", async () => {
  // GIVEN
  const FUNCTION_NAME = "FUNCTION_NAME";
  const PAYLOAD = "PAYLOAD";
  const RESPONSE = { foo: "bar" };
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
  const client = new FunctionClient(FUNCTION_NAME);
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
  const client = new FunctionClient("FUNCTION_NAME");
  await expect(client.invoke(PAYLOAD)).rejects.toThrow(
    /Invoke failed with message: "Unhandled". Full error:/
  );
});
