/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring ex;

let t1 = new ex.DynamodbTable(name: "test1", attributeDefinitions: { "k1": "S", "k2": "S" }, hashKey: "k1", rangeKey: "k2");

test "transactWriteItems" {
  t1.putItem({
    item: {
      "k1": "key1",
      "k2": "value1",
      "k3": "other-value1"
    }
  });
  t1.putItem({
    item: {
      "k1": "key2",
      "k2": "value2",
      "k3": "other-value2"
    }
  });

  t1.transactWriteItems(transactItems: [
    ex.DynamodbTransactWriteItem{
      put: {
        item: {
          "k1": "key3",
          "k2": "value3",
          "k3": "other-value3"
        }
      },
    },
    ex.DynamodbTransactWriteItem{
      delete: {
        key: { "k1": "key2", "k2": "value2" }
      },
    },
    ex.DynamodbTransactWriteItem{
      update: {
        key: { "k1": "key1", "k2": "value1" },
        updateExpression: "set k3 = :k3",
        expressionAttributeValues: { ":k3": "not-other-value1" }
      },
    }
  ]);

  let var r = t1.getItem({ key: { "k1": "key1", "k2": "value1" } });
  assert(r.item?.get("k1")?.asStr() == "key1");
  assert(r.item?.get("k2")?.asStr() == "value1");
  assert(r.item?.get("k3")?.asStr() == "not-other-value1");

  r = t1.getItem({ key: { "k1": "key2", "k2": "value2" } });
  assert(r.item?.tryGet("k1") == nil);

  r = t1.getItem({ key: { "k1": "key3", "k2": "value3" } });
  assert(r.item?.get("k1")?.asStr() == "key3");
  assert(r.item?.get("k2")?.asStr() == "value3");
  assert(r.item?.get("k3")?.asStr() == "other-value3");
}
