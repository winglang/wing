bring cloud;

let b = new cloud.Bucket();

test "get range of an object" {
  b.put("test1.txt", "12345");

  assert(b.get("test1.txt", start: 1, end: 3) == "234");
  assert(b.get("test1.txt", start: 1) == "2345");
  assert(b.get("test1.txt", end: 3) == "1234");
}
