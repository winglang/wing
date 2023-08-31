bring cloud;
bring http;
bring util;

let testBucket = new cloud.Bucket(public: true) as "testBucket";

test "signedUrl" {
  let var error = "";
  testBucket.put("file1.txt", "Foo");

  let signedUrl = testBucket.signedUrl("file1.txt");
  assert(signedUrl != "");

}