use cloud;

bucket := new cloud::Bucket();

inflight function handler() {
  bucket.upload("file.txt", "data");
}

new cloud::Function(handler);
