import type extern from "./dynamo.extern";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const _putItem: extern["_putItem"] = async (tableName, item) => {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  const response = await client.send(command);
  console.log(response);
  return;
};

export const _getItem: extern["_getItem"] = async (tableName, key) => {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: key,
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};
