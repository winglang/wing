use cloud;

// type checking for captures not currently supported
// TODO Update once supported
bucket := new cloud::Bucket();

inflight function test() {
  x := -1;
  z := 11 + x;
  bucket.upload();
}
