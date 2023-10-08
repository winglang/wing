bring cloud;
bring ex;
bring "./../../valid/assertions.w" as assertions;

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

  table.insert(VALID_KEY, Json { gender: COLUMN_VALUE });
  assert(table.get(VALID_KEY).get(COLUMN_NAME) == COLUMN_VALUE);
  assertions.Assert.throws(ROW_DOES_NOT_EXIST_ERROR, () => {
    table.get(NON_EXISTENT_KEY);
  });

  let var result: Json = table.tryGet(VALID_KEY);
  assert(result.get(COLUMN_NAME) == COLUMN_VALUE);
  assert(table.tryGet(NON_EXISTENT_KEY) == nil);
}
