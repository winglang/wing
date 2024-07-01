bring cloud;

let b = new cloud.Bucket();

test "putJson" {
  let jsonObj1 = Json { test: "test1" };
  let jsonObj2 = Json { test: "test2" };

  b.putJson("test1.txt", jsonObj1);
  b.putJson("test2.txt", jsonObj2);

  let testJson1 = b.getJson("test1.txt");
  let testJson2 = b.getJson("test2.txt");
  
  assert(testJson1.get("test") == jsonObj1.get("test"));
  assert(testJson2.get("test") == jsonObj2.get("test"));

  let jsonObj3 = Json { test: "test3" };
  b.putJson("test3.txt", jsonObj3);
  let testJson3 = b.getJson("test3.txt");

  assert(testJson3.get("test") == jsonObj3.get("test"));

  b.delete("test1.txt");
  let files = b.list();
  
  assert(files.contains("test1.txt") == false);
  assert(files.contains("test2.txt") == true);
}