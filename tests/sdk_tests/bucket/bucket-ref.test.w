bring cloud;
bring aws;
bring expect;

let b = new cloud.Bucket();

// this will only work if we are testing on tf-aws
if let name = aws.Bucket.from(b)?.bucketName {
  let bref = new aws.BucketRef(name);

  test "can store and get objects (BucketRef)" {
    bref.put("key1", "value1");
    expect.equal(bref.get("key1"), "value1");
  }
}

if @target == "sim" {
  let dummyName = "wing-dummy-bucket";
  let dummyArn = "arn:aws:s3:::{dummyName}";
  let br = new aws.BucketRef(dummyName);

  test "bucketArn returns the arn" {
    expect.equal(dummyArn, br.bucketArn);
    expect.equal(dummyName, br.bucketName);
    expect.equal(dummyName + ".s3.amazonaws.com", br.bucketDomainName);
  }

  test "get() sends a request to aws, fails because we are using a dummy bucket" {
    let var err = false;
    try {
      br.get("key1");
    } catch e {
      err = true;
    }

    assert(err);
  }
}
