bring cloud;

let b = new cloud.Bucket();

test "tryGetJson" {
  let jsonObj1 = Json { key1: "value1" };
  let jsonObj2 = Json { key2: "value2" };

  b.putJson("file1.json", jsonObj1);
  
  assert(Json.stringify(b.tryGetJson("file1.json")) == Json.stringify(jsonObj1));
  assert(b.tryGetJson("file2.json") == nil);

  b.putJson("file2.json", jsonObj2);

  assert(Json.stringify(b.tryGetJson("file2.json")) == Json.stringify(jsonObj2));

  b.delete("file1.json");
  b.delete("file2.json");

  assert(b.tryGetJson("file1.json") == nil);
  assert(b.tryGetJson("file2.json") == nil);
}