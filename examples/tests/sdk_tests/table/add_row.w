bring cloud;

let table = new cloud.Table( 
    name: "users", 
    primaryKey: "name", 
    columns: { gender: cloud.ColumnType.STRING } 
);

let marioInfo = Json { gender: "male", role: "plumber" };
let peachInfo = Json { gender: "female", role: "princess" };
table.addRow("mario", marioInfo);
table.addRow("peach", peachInfo);


test "addRow" {
    assert(Json.stringify(table.get("mario")) == Json.stringify(marioInfo));
    assert(Json.stringify(table.get("peach")) == Json.stringify(peachInfo));
}
