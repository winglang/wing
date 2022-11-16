bring cloud;

let bucket1 = new cloud.Bucket();

print("Hello world!");

inflight handler(event: str): str {
  print(event);
}

new cloud.Function(handler);
