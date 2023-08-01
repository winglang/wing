let f1 = (...args: Array<num>, x:num) => {};
//           ^^^^ Variadic parameters must always be the last parameter in a function.

let f2 = (...args: Array<num>) => {};
f2(1, true, 2);
//    ^^^^ Expected type to be num, but got bool instead.

bring cloud;
let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let funcBucket = (...buckets: Array<cloud.Bucket>) => {
  assert(buckets.length == 2);
};
funcBucket(bucket1, true, bucket2);
//                  ^^^^ Expected type to be Bucket, but got bool instead.

let f3 = (...args: Set<num>) => {};
//           ^^^^ Variadic parameters must be type Array or MutArray.
