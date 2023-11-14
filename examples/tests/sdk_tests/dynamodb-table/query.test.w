/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring ex;

let t1 = new ex.DynamodbTable(name: "test1", attributeDefinitions: { "k1": "S", "k2": "S" }, hashKey: "k1", rangeKey: "k2");

test "query" {
  t1.putItem({
    item: {
      "k1": "key1",
      "k2": "value1",
      "k3": "other-value1"
    }
  });
  t1.putItem({
    item: {
      "k1": "key1",
      "k2": "value2",
      "k3": "other-value2"
    }
  });

  let result = t1.query(
    keyConditionExpression: "k1 = :k1",
    expressionAttributeValues: {
      ":k1": "key1",
    },
  );

  assert(result.count == 2);
  assert(result.items.at(0).get("k1") == "key1");
  assert(result.items.at(0).get("k2") == "value1");
  assert(result.items.at(0).get("k3") == "other-value1");
  assert(result.items.at(1).get("k1") == "key1");
  assert(result.items.at(1).get("k2") == "value2");
  assert(result.items.at(1).get("k3") == "other-value2");
}
