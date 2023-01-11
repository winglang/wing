bring cloud;

let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

//Array tests
let arr1 = MutArray<str>["a", "b", "c"];
let arr2: MutArray<num> = MutArray<num>[1, 2, 3];
let arr3 = MutArray<cloud.Bucket>[bucket1, bucket2];
arr1.push("a");
arr2.push(4);
arr3.push(bucket3);

//Set tests
let s1 = MutSet<num>{1, 2, 3, 3};
let s2: MutSet<str> = MutSet<str>{"hello", "world", "hello"};
let s3 = MutSet<cloud.Bucket>{bucket1, bucket2, bucket2};
s1.add(5);
s2.add("bye");
s3.add(bucket3);
