bring cloud;
bring ex;

let table = new ex.Table( 
    name: "users",
    primaryKey: "name",
    columns: { "gender" => ex.ColumnType.STRING } 
);


test "tryGet" {
  let COLUMN_NAME="gender";
  let COLUMN_VALUE="male";
  let VALID_KEY = "foo";
  let NON_EXISTENT_KEY = "bar";

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

  table.insert(VALID_KEY, Json { gender: COLUMN_VALUE });
  assert(table.tryGet(VALID_KEY)?.tryGet(COLUMN_NAME)?.tryAsStr() == COLUMN_VALUE);
  assert(table.tryGet(NON_EXISTENT_KEY) == nil);
}
