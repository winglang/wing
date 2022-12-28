bring cloud;

//Array tests
let arr1 = [1, 2, 3];
let arr2: Array<num> = [1, 2, 3];
let arr3 = Array<num>[1, 2, 3];
let arr4: Array<num> = Array<num>[1, 2, 3];

let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";
let arr5 = [bucket1, bucket2, bucket3];
//let arr6: Array<cloud.Bucket> = [bucket1, bucket2, bucket3];

//Map tests
let m1 = {"a":1, "b":2, "c":3};
let m2: Map<num> = {"a":1, "b":2, "c":3};
let m3 = Map<num> {"a":1, "b":2, "c":3};
let m4: Map<num> = Map<num> {"a":1, "b":2, "c":3};
let m5 = {"a":bucket1, "b":bucket2, "c":bucket3};
//let m6: Map<cloud.Bucket> = {"a":bucket1, "b":bucket2, "c":bucket3};