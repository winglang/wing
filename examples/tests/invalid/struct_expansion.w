bring cloud;

let bucket1 = new cloud.Bucket(bublic: false, public: true);
let bucket2 = new cloud.Bucket(2, public: true);

inflight handler(event: str): str {
  bucket1.put(file: "file.txt", "data");
}

new cloud.Function(
  handler, 
  cloud.FunctionProps {
    env: Map<str> {}
  }
);
