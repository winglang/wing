bring ex;
bring util;

let table = new ex.Table(
    name: "users",
    primaryKey: "name", 
    columns: { 
      "gender" => ex.ColumnType.STRING,
      "role" => ex.ColumnType.STRING 
    } 
);

let marioInfo = Json { gender: "male", role: "plumber" };
let peachInfo = Json { gender: "female", role: "princess" };
table.addRow("mario", marioInfo);
table.addRow("peach", peachInfo);


test "addRow" {
  assert(table.get("mario").get("name") == "mario");
  assert(table.get("mario").get("role") == marioInfo.get("role"));
  assert(table.get("mario").get("gender") == marioInfo.get("gender"));

  assert(table.get("peach").get("name") == "peach");
  assert(table.get("peach").get("role") == peachInfo.get("role"));
  assert(table.get("peach").get("gender") == peachInfo.get("gender"));
}
