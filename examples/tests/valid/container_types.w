bring cloud;

let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

//Array tests
let empty_array = Array<num>[];
let arr1 = [1, 2, 3];
let arr2: Array<str> = ["1", "2", "3"];
let arr3 = Array<num>[1, 2, 3];
let arr4: Array<num> = Array<num>[1, 2, 3];
let arr5 = [bucket1, bucket2, bucket3];
let arr6: Array<cloud.Bucket> = [bucket1, bucket2, bucket3];
let arr7: Array<num> = arr4;
assert(arr1.length == 3);
assert(arr2.at(1) == "2");

//Map tests
let empty_map = Map<num>{};
let implicit_empty_map = {};
assert(implicit_empty_map.size == 0);
let m1 = {"a":1, "b":2, "c":3};
let m2: Map<num> = {"a":1, "b":2, "c":3};
let m3 = Map<num> {"a":1, "b":2, "c":3};
let m4: Map<num> = Map<num> {"a":1, "b":2, "c":3};
let m5 = {"a":bucket1, "b":bucket2, "c":bucket3};
let m6: Map<cloud.Bucket> = {"a":bucket1, "b":bucket2, "c":bucket3};
let m7: Map<num> = m1;
assert(m1.size == 3);
assert(m5.get("b") == bucket2);
assert(m7.has("b"));
assert(m4.has("boom") == false);

// TODO: add map API tests

//Set tests
let empty_set = Set<num>{};
let s2: Set<num> = {1, 2, 3};
let s3 = Set<num> {1, 2, 3};
let s4: Set<num> = Set<num> {1, 2, 3};
let s6: Set<cloud.Bucket> = {bucket1, bucket2, bucket3};
let s7: Set<num> = s2;
assert(s2.size == 3);
assert(s3.has(2));