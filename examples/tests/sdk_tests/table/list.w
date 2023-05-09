
bring cloud;

let table = new cloud.Table( 
    name: "users", 
    primary_key: "name", 
    columns: { gender: cloud.ColumnType.STRING } 
);


new cloud.Function(inflight () => {
  table.insert("eyal", Json { gender: "male" });
  table.insert("revital", Json { gender: "female" });
  let unorderded = MutJson {};
  for u in table.list() {
    unorderded.set(str.from_json(u.get("name")), u);
  }
  let revital = unorderded.get("revital");
  let eyal = unorderded.get("eyal");
  
  assert("eyal" == str.from_json(eyal.get("name")));
  assert("male" == str.from_json(eyal.get("gender")));
  assert("revital" == str.from_json(revital.get("name")));
  assert("female" == str.from_json(revital.get("gender")));
}) as "test";