bring ex;
bring util;

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
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
        block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };

  let JSON_PROPERTY_ROLE_DOES_NOT_EXIST_ERROR = "Json property \"role\" does not exist";
  let JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR = "Json property \"gender\" does not exist";

  table.upsert("mario", {});
  table.upsert("luigi", { role: "ghostbuster" });
  table.upsert("peach", { gender: "female", role: "princess" });

  assertThrows(JSON_PROPERTY_ROLE_DOES_NOT_EXIST_ERROR, () => {
    table.get("mario").get("role");
  });
  assertThrows(JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR, () => {
    table.get("mario").get("gender");
  });

  assert(table.get("luigi").get("role") == "ghostbuster");
  assertThrows(JSON_PROPERTY_GENDER_DOES_NOT_EXIST_ERROR, () => {
    table.get("luigi").get("gender");
  });

  assert(table.get("peach").get("name") == "peach");
  assert(table.get("peach").get("role") == "princess");
  assert(table.get("peach").get("gender") == "female");
}
