bring cloud;
bring ex;

let table = new ex.Table( 
    name: "users",
    primaryKey: "name",
    columns: { "gender" => ex.ColumnType.STRING } 
);


test "get" {
  let COLUMN_NAME="gender";
  let COLUMN_VALUE="male";
  let VALID_KEY = "foo";
  let NON_EXISTENT_KEY = "bar";
  let ROW_DOES_NOT_EXIST_ERROR = "Row does not exist (key=${NON_EXISTENT_KEY})";

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
  assert(table.get(VALID_KEY).get(COLUMN_NAME) == COLUMN_VALUE);
  assertThrows(ROW_DOES_NOT_EXIST_ERROR, () => {
    table.get(NON_EXISTENT_KEY);
  });

  let var result: Json = table.tryGet(VALID_KEY);
  assert(result.get(COLUMN_NAME) == COLUMN_VALUE);
  assert(table.tryGet(NON_EXISTENT_KEY) == nil);
}
