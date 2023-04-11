bring cloud;

let bucket1 = new cloud.Bucket();
let bucket2 = new cloud.Bucket(cloud.BucketProps {
  public: true
}) as "PublicBucket";
let bucket3 = new cloud.Bucket(public: false) as "PrivateBucket";
let queue = new cloud.Queue();

let handler = inflight (event: str): str => {
  bucket1.put("file.txt", "data");
  bucket2.get("file.txt");
  bucket2.get("file2.txt");
  bucket3.get("file3.txt");

  for stuff in bucket1.list() {
    log(stuff);
  }

  log(bucket2.public_url("file.txt"));

  try {
    bucket1.public_url("file.txt");
  } catch error {
    log(error);
  }
};

queue.add_consumer(handler, batch_size: 5);

new cloud.Function(
  handler, 
  env: Map<str> {}
);

let empty_env = Map<str> {};

new cloud.Function(
  handler, 
  env: empty_env
) as "AnotherFunction";
