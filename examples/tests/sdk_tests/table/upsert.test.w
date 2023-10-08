bring ex;
bring util;
bring "./../../valid/assertions.w" as assertions;

let table = new ex.Table(
  name: "users",
  primaryKey: "name", 
  columns: { 
    "gender" => ex.ColumnType.STRING,
    "role" => ex.ColumnType.STRING,
  } 
);

table.addRow("mario", { gender: "male", role: "plumber" });
table.addRow("luigi", { gender: "male", role: "plumber" });

test "upsert" {
  let JSON_PROPERTY_ROLE_DOES_NOT_EXIST_ERROR = "Json property \"role\" does not exist";
  let JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR = "Json property \"gender\" does not exist";

  table.upsert("mario", {});
  table.upsert("luigi", { role: "ghostbuster" });
  table.upsert("peach", { gender: "female", role: "princess" });

  assertions.Assert.throws(JSON_PROPERTY_ROLE_DOES_NOT_EXIST_ERROR, () => {
    table.get("mario").get("role");
  });
  assertions.Assert.throws(JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR, () => {
    table.get("mario").get("gender");
  });

  assert(table.get("luigi").get("role") == "ghostbuster");
  assertions.Assert.throws(JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR, () => {
    table.get("luigi").get("gender");
  });

  assert(table.get("peach").get("name") == "peach");
  assert(table.get("peach").get("role") == "princess");
  assert(table.get("peach").get("gender") == "female");
}
