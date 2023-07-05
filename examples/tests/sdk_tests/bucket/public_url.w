bring cloud;
bring http;
bring util;

let publicBucket = new cloud.Bucket(public: true) as "publicBucket";
let privateBucket = new cloud.Bucket() as "privateBucket";

test "publicUrl" {
  let var error = "";
  publicBucket.put("file1.txt", "Foo");
  privateBucket.put("file2.txt", "Bar");

  let publicUrl = publicBucket.publicUrl("file1.txt");
  assert(publicUrl != "");
  
  // TODO: works in aws, doesn't work in sim since publicUrl is returning a path to the file, remove condition when #2833 is resolved.
  if (util.env("WING_TARGET") != "sim") {
    assert(http.get(publicUrl).body ==  "Foo");
  }

  try {
    privateBucket.publicUrl("file2.txt");
  } catch e {
    error = e;
  }
  assert(error == "Cannot provide public url for a non-public bucket");
}