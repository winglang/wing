bring cloud;
bring http;
bring util;
bring "./../../valid/assertions.w" as assertions;

let testBucket = new cloud.Bucket(public: true) as "testBucket";

test "signedUrl" {
  let var error = "";
  testBucket.put("file1.txt", "Foo");
  
  if (util.env("WING_TARGET") != "sim") { 
    let signedUrl = testBucket.signedUrl("file1.txt");
    assert(http.get(signedUrl).body ==  "Foo"); 
  } 
}

test "signedUrl for non existent key" {
  let var error = "";
  
  if (util.env("WING_TARGET") != "sim") {
    assertions.Assert.throws("Cannot provide signed url for a non-existent key (key=file.txt)", () =>{
      let signedUrl = testBucket.signedUrl("file.txt");
    });
  }
}
