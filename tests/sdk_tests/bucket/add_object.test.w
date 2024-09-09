bring cloud;

let b = new cloud.Bucket();
let jsonObj1 = Json { key1: "value1" };

b.addObject("file1.json", Json.stringify(jsonObj1));
b.addObject("file2.txt", "Bar");

test "addObject" {
  assert(b.list().length == 2);
  assert(Json.stringify(b.getJson("file1.json")) == Json.stringify(jsonObj1));
  assert(b.get("file2.txt") == "Bar");
}