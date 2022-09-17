bring cloud;

// type checking for captures not currently supported
// TODO Update once supported
let bucket = new cloud.Bucket();
cloud.Bucket();

inflight test() {
  let x = -1;
  let z = 11 + x;
  bucket.upload();
}
