
bring cloud;
bring ex;

let table = new ex.Table( 
    name: "users",
    primaryKey: "name",
    columns: { "gender" => ex.ColumnType.STRING } 
);


test "list" {
  table.insert("eyal", Json { gender: "male" });
  table.insert("revital", Json { gender: "female" });
  let unorderded = MutJson {};
  for u in table.list() {
    unorderded.set(str.fromJson(u.get("name")), u);
  }
  let revital = unorderded.get("revital");
  let eyal = unorderded.get("eyal");
  
  assert("eyal" == str.fromJson(eyal.get("name")));
  assert("male" == str.fromJson(eyal.get("gender")));
  assert("revital" == str.fromJson(revital.get("name")));
  assert("female" == str.fromJson(revital.get("gender")));
}
