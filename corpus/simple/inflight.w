use cloud;

// type checking for captures not currently supported
// TODO Update once supported
let bucket = new cloud::Bucket();

inflight function test() {
  let x = -1;
  let z = 11 + x;
  bucket.upload();
}
