bring ex;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let table = new ex.Table(
  name: "users",
  primaryKey: "name",
  columns: { "gender" => ex.ColumnType.STRING }
) as "aws-wing-table";

let getTableInfo = (t: ex.Table): Map<str>? => {
  if let table = aws.Table.from(t) {
    return {
      tableName: table.tableName,
      arn: table.arn,
    };
  }
  return nil;
};

let tableInfo = getTableInfo(table);

test "validates the AWS topic name" {
  if let table = tableInfo {
    if target == "tf-aws" {
      assert(table.get("arn").contains("arn:aws:dynamodb:"));
      assert(table.get("arn").contains("aws-wing-table"));
      assert(table.get("tableName").contains("aws-wing-table"));
    }
  } else {
    // If the test is not on AWS, it should not fail, so I am returning true.
    assert(true);
  }
}