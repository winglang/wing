bring cloud;
bring http;
bring util;

let testBucket = new cloud.Bucket(public: true) as "testBucket";

test "signedUrl" {
  let var error = "";
  testBucket.put("file1.txt", "Foo");

  let signedUrl = testBucket.signedUrl("file1.txt");
  assert(http.get(signedUrl).ok);


}

test "signedUrlForNonExistentKey"{
  et var error = "";
  testBucket.put("file1.txt", "Foo");

  try{
    let signedUrl = testBucket.signedUrl("file1.txt");
  }catch e{
    error=e;
  }

  assert(error == "Cannot provide signed url for a non-public bucket");
}
