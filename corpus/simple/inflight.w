
bucket := 0;

inflight function test() {
  x := -1;
  z := 11 + x;
  bucket.upload();
}
