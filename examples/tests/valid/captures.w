bring cloud;

let bucket1 = new cloud.Bucket();
let bucket2 = new cloud.Bucket(cloud.BucketProps {
  public: true
}) as "PublicBucket";
let bucket3 = new cloud.Bucket(public: false) as "PrivateBucket";

inflight handler(event: str): str {
  bucket1.put("file.txt", "data");
  bucket2.get("file.txt");
  bucket3.get("file2.txt");
}

new cloud.Function(
  handler, 
  cloud.FunctionProps {
    env: Map<str> {}
  }
);
