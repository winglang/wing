bring ex;

new ex.DynamodbTable({
  name: "table",
  attributeDefinitions: { "id": "S" },
  keySchema: { "id": "HASH" }
});
