bring cloud;

let b = new cloud.Bucket();

test "uploading many objects" {
  for i in 0..500 {
    b.put("test{i}", "{i}");
  }
}
