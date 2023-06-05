bring cloud;

let bucketProps = cloud.BucketProps{public: true};
let publicBucket = new cloud.Bucket(bucketProps) as "publicBucket";
let privateBucket = new cloud.Bucket() as "privateBucket";

test "publicUrl" {
  let var error = "";
  publicBucket.put("file1.txt", "Foo");
  privateBucket.put("file2.txt", "Bar");

  assert(publicBucket.publicUrl("file1.txt") != "");

  try {
    privateBucket.publicUrl("file2.txt");
  } catch e {
    error = e;
  }

  assert(error == "Cannot provide public url for a non-public bucket");
}