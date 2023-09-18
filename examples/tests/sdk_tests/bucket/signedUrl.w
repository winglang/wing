bring cloud;
bring http;
bring util;

let testBucket = new cloud.Bucket(public: true) as "testBucket";

test "signedUrl" {
  let var error = "";
  testBucket.put("file1.txt", "Foo");

  let signedUrl = testBucket.signedUrl("file1.txt");
   if (util.env("WING_TARGET") != "sim") { 
   assert(http.get(publicUrl).body ==  "Foo"); 
  } 


}

test "signedUrlForNonExistentKey"{
  let var error = "";
  try{
    let signedUrl = testBucket.signedUrl("file.txt");
  }catch e{
    error=e;
  }

  assert(error == "Cannot provide signed url for a non-public bucket");
}
