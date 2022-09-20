bring cloud;

let bucket = new cloud::Bucket();

inflight handler() {
  bucket.upload("file.txt", "data");
  bucket.delete("file.txt");
}

new cloud::Function(handler);
