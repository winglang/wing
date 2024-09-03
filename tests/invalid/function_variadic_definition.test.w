let f1 = (...args: Array<num>, x:num) => {};
//           ^^^^ Variadic parameters must always be the last parameter in a function.

let f2 = (...nums: Array<num>, ...strs: Array<str>) => {};
//           ^^^^ Variadic parameters must always be the last parameter in a function.

let f3 = (...args: Array<num>) => {};
f3(1, true, 2);
//    ^^^^ Expected type to be num, but got bool instead.

let f4 = (...args: Set<num>) => {};
//           ^^^^ Variadic parameters must be type Array or MutArray.

let f5 = (...args: Array<num>) => {};
f5(args: 1, 2);
// ^^^^^^^^^^^^^^ No named arguments expected

bring cloud;
let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let funcBucket = (...buckets: Array<cloud.Bucket>) => {
  assert(buckets.length == 2);
};
funcBucket(bucket1, true, bucket2);
//                  ^^^^ Expected type to be Bucket, but got bool instead.
