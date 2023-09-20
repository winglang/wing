bring ex;

new ex.DynamodbTable({
  name: "table",
  attributeDefinitions: { "id": "S" },
  hashKey: "id"
  });
