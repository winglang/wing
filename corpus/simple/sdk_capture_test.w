bring cloud;

let bucket = new cloud::Bucket();

inflight handler() {
  bucket.upload("file.txt", "data");
}

new cloud::Function(handler);
