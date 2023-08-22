const { DynamoDBClient, PutItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

export async function _putItem(tableName, item) {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: item,
  });

  const response = await client.send(command);
  console.log(response);
  return;
}

export async function _getItem(tableName, key) {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: key
  });

  const response = await client.send(command);
  console.log(response);
  return response;
}