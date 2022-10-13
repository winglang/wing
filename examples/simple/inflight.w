bring cloud as c;

let p = c.BucketProps {
    public: false
};

let bucket = new c.Bucket(p);

inflight test() {
  let x = -1;
  let z = 11 + x;
  bucket.put("foo", "bar");
}
