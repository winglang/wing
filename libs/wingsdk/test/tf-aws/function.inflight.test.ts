import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { fromUtf8 } from "@aws-sdk/util-utf8-node";
import { mockClient } from "aws-sdk-client-mock";
import { FunctionClient } from "../../src/tf-aws/function.inflight";

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
      Payload: fromUtf8(PAYLOAD),
    })
    .resolves({
      StatusCode: 200,
      Payload: fromUtf8(RESPONSE),
    });

  // WHEN
  const client = new FunctionClient(FUNCTION_NAME);
  const response = await client.invoke(PAYLOAD);

  // THEN
  expect(response).toEqual(RESPONSE);
});
