bring ex;
bring aws;
bring util;

let target = util.env("WING_TARGET");

let table = new ex.Table(
  name: "users",
  primaryKey: "name",
) as "aws-wing-table";

let getTableName = (t: ex.Table): str? => {
  if let table = aws.Table.from(t) {
    let tableAws = table.innerAwsTable();
    if target == "tf-aws" {
      return tableAws.name;
    }
  }
  return nil;
};

let tableName = getTableName(table);

test "validates the AWS table name" {
  if let name = tableName {
    if target == "tf-aws" {
      assert(name.contains("aws-wing-table"));
    } 
  }
  // If the test is not on AWS, it should not fail, so I am returning true.
  assert(true);
}