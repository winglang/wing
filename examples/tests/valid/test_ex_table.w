bring ex;

let table = new ex.Table( 
    name: "users", 
    primaryKey: "name", 
    columns: {} 
);

test "get" {
 let var error : str? = nil;
  try {
    table.tryGet("nonExistent");
  } catch err {
    error = err;
  }
  assert(error != nil);
}