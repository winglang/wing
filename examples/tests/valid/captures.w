bring cloud;

let bucket1 = new cloud.Bucket();
let bucket2 = new cloud.Bucket(cloud.BucketProps {
  public: true
}) as "PublicBucket";
let bucket3 = new cloud.Bucket(public: false) as "PrivateBucket";
let queue = new cloud.Queue();

inflight handler(event: str): str {
  bucket1.put("file.txt", "data");
  bucket2.get("file.txt");
  bucket2.get("file2.txt");
  bucket3.get("file3.txt");
}

new cloud.Function(
  handler, 
  env: Map<str> {}
);
queue.on_message(handler, batch_size: 5);