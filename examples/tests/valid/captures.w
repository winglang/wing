bring cloud;

let p = cloud.BucketProps {
    public: false
};

let bucket = new cloud.Bucket(p);

inflight handler(event: str):str {
  bucket.put("file.txt", "data");
  bucket.get("file.txt");
}

new cloud.Function(
  handler, 
  cloud.FunctionProps {
    env: Map<str> {}
  }
);
