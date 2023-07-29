bring cloud;
let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let funcBucket = (...buckets: Array<cloud.Bucket>) => {
  assert(buckets.length == 2);
};
funcBucket(bucket1, bucket2);

let func1 = (var x: num, y: str?, ...args: Array<num>) => {
  assert(x == 1);
  assert(y == "something" || y == nil);
  assert(args.length == 4);
  for i in args {
    assert(i > 0 && i < 5);
  }
};
func1(1, "something", 1, 2, 3, 4);
func1(1, nil, 1, 2, 3, 4);
