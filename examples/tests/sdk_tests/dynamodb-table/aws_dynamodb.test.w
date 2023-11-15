bring ex;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let table = new ex.DynamodbTable(
  name: "test1",
  attributeDefinitions: { "k1": "S", "k2": "S" },
  hashKey: "k1",
  rangeKey: "k2"
) as "aws-wing-dynamodb";

let getTableInfo = (t: ex.DynamodbTable): Map<str>? => {
  if let table = aws.Table.from(t) {
    return {
      tableName: table.tableName(),
      arn: table.arn(),
    };
  }
  return nil;
};

let tableInfo = getTableInfo(table);

test "validates the AWS dynamodb name" {
  if let table = tableInfo {
    assert(table.get("arn").contains("arn:aws:dynamodb:"));
    assert(table.get("arn").contains("aws-wing-dynamodb"));
    assert(table.get("tableName").contains("aws-wing-dynamodb"));
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}