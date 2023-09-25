bring cloud;
let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

// can use variadic methods from the jsii world
bucket3.node.addDependency(bucket1, bucket2);

let funcBucket = (...buckets: Array<cloud.Bucket>) => {
  assert(buckets.length == 2);
};
funcBucket(bucket1, bucket2);

let func1 = (var x: num, y: str?, var ...args: MutArray<num>) => {
  assert(x == 1);
  assert(y == "something" || y == nil);
  assert(args.length == 4);
  for i in args {
    assert(i > 0 && i < 5);
  }
  args.push(10);
  assert(args.at(4) == 10);
};
func1(1, "something", 1, 2, 3, 4);
func1(1, nil, 1, 2, 3, 4);

let addNums = (...nums: MutArray<num>):num => {
  let var total = 0;
  for n in nums {
    total = total + n;
  }
  return total;
};
assert(addNums(1, 2, 3) == 6);
assert(addNums() == 0);
