const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

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
