bring cloud;

let bucket1 = new cloud.Bucket();
let bucket2 = new cloud.Bucket(cloud.BucketProps {
  public: true
}) as "PublicBucket";
let bucket3 = new cloud.Bucket(public: false) as "PrivateBucket";
let queue = new cloud.Queue();

let handler = inflight () => {
  bucket1.put("file.txt", "data");
  bucket2.get("file.txt");
  bucket2.get("file2.txt");
  bucket3.get("file3.txt");

  for stuff in bucket1.list() {
    log(stuff);
  }

  log(bucket2.publicUrl("file.txt"));

  try {
    bucket1.publicUrl("file.txt");
  } catch error {
    log(error);
  }
};

queue.setConsumer(inflight () => { handler(); }, batchSize: 5);

new cloud.Function(
  handler, 
  env: Map<str> {}
);

let emptyEnv = Map<str> {};

new cloud.Function(
  handler, 
  env: emptyEnv
) as "AnotherFunction";


let headers = {
  "my-fancy-header" => "my-fancy-value",
  "not-even-real\"" => "wow` !",
};
let api = new cloud.Api();
api.get("/hello", inflight (req) => {
  return cloud.ApiResponse {
    status: 200,
    headers: headers,
    body: "Hello, world!"
  };
});
