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

let getTableName = (t: ex.DynamodbTable): str? => {
  if let table = aws.Table.from(t) {
    let tableAws = table.innerAwsTable();
    if target == "tf-aws" {
      return tableAws.name;
    }
    return tableAws.tableName;
  }
  return nil;
};

let tableName = getTableName(table);

test "validates the AWS dynamodb name" {
  if let name = tableName {
    assert(name.contains("aws-wing-dynamodb"));
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}