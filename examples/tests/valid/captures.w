bring cloud;

let p = cloud.BucketProps {
    public: false
};

let bucket = new cloud.Bucket(p);
print("one bucket");

inflight handler(event: str): str {
  print(event);
  bucket.put("file.txt", "data");
  bucket.get("file.txt");
}

new cloud.Function(
  handler, 
  cloud.FunctionProps {
    env: Map<str> {}
  }
);
