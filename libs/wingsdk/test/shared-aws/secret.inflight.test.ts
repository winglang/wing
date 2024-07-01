import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { mockClient } from "aws-sdk-client-mock";
import "aws-sdk-client-mock-jest";
import { test, expect, beforeEach } from "vitest";
import { SecretClient } from "../../src/shared-aws/secret.inflight";

const secretsManagerClientMock = mockClient(SecretsManagerClient);

const SECRET_ARN =
  "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-gwMwkg";
const SECRET_VALUE = JSON.stringify({ key: "value" });

beforeEach(() => {
  secretsManagerClientMock.reset();
  secretsManagerClientMock
    .on(GetSecretValueCommand)
    .resolves({ SecretString: SECRET_VALUE });
});

test("value", async () => {
  // WHEN
  const client = new SecretClient(SECRET_ARN);
  const secretValue = await client.value();

  // THEN
  expect(secretsManagerClientMock).toHaveReceivedCommandTimes(
    GetSecretValueCommand,
    1
  );
  expect(secretsManagerClientMock).toHaveReceivedCommandWith(
    GetSecretValueCommand,
    { SecretId: SECRET_ARN }
  );
  expect(secretValue).toBe(SECRET_VALUE);
});

test("valueJson", async () => {
  // WHEN
  const client = new SecretClient(SECRET_ARN);
  const secretValue = await client.valueJson();

  // THEN
  expect(secretValue).toEqual(JSON.parse(SECRET_VALUE));
});

test("caches the value", async () => {
  // WHEN
  const client = new SecretClient(SECRET_ARN);
  await client.value();
  await client.value();

  // THEN
  expect(secretsManagerClientMock).toHaveReceivedCommandTimes(
    GetSecretValueCommand,
    1
  );
});

test("can bypass cache", async () => {
  // WHEN
  const client = new SecretClient(SECRET_ARN);
  await client.value();
  await client.value({ cache: false });

  // THEN
  expect(secretsManagerClientMock).toHaveReceivedCommandTimes(
    GetSecretValueCommand,
    2
  );
});
