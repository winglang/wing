bring cloud;
bring util;

let bucketProps = cloud.BucketProps { public: true };
let publicBucket = new cloud.Bucket(bucketProps) as "publicBucket";
let privateBucket = new cloud.Bucket() as "privateBucket";

test "publicUrl" {
  let var error = "";
  publicBucket.put("file1.txt", "Foo");
  privateBucket.put("file2.txt", "Bar");

  let publicUrl = publicBucket.publicUrl("file1.txt");
  assert(publicUrl != "");
  // TODO: works in aws, doesn't work in sime since publicUrl is returnning a path to the file, uncomment when #2833 is resolved.
  // assert(util.Http.get(publicUrl).body ==  "Foo");

  try {
    privateBucket.publicUrl("file2.txt");
  } catch e {
    error = e;
  }
  assert(error == "Cannot provide public url for a non-public bucket");
}