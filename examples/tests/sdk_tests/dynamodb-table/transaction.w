bring ex;

let t1 = new ex.DynamodbTable(name: "test1", primaryKey: "k1");

test "transactWriteItems" {
  t1.putItem({
    "k1": "key1",
    "k2": "value1"
  });
  t1.putItem({
    "k1": "key2",
    "k2": "value2"
  });

  t1.transactWriteItems(transactItems: [
    ex.DynamodbTransactWriteItem{
      put: {
        item: {
          "k1": "key3",
          "k2": "value3"
        }
      },
    },
    ex.DynamodbTransactWriteItem{
      delete: {
        key: "key2"
      },
    },
    ex.DynamodbTransactWriteItem{
      update: {
        key: "key1",
        updateExpression: "set k2 = :k2",
        expressionAttributeValues: { ":k2": "not-value1" }
      },
    }
  ]);

  let var r = t1.getItem("key1");
  assert(r.get("k1").asStr() == "key1");
  assert(r.get("k2").asStr() == "not-value1");

  r = t1.getItem("key2");
  assert(r.tryGet("k1") == nil);

  r = t1.getItem("key3");
  assert(r.get("k1").asStr() == "key3");
  assert(r.get("k2").asStr() == "value3");
}
