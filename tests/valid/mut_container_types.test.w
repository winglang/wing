bring cloud;

let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

//Array tests
let arr1 = MutArray<str>["a", "b", "c"];
let arr2: MutArray<num> = MutArray<num>[1, 2, 3];
let arr3 = MutArray<cloud.Bucket>[bucket1, bucket2];
let arr4: MutArray<str> = arr1;
arr1.push("a");
arr2.push(4);
arr3.push(bucket3);
assert(arr2.pop() == 4);
assert(arr1.length == 4);
assert(arr4.at(0) == "a");

//Set tests
let s1 = MutSet<num>[1, 2, 3, 3];
let s2: MutSet<str> = MutSet<str>["hello", "world", "hello"];
let s3 = MutSet<cloud.Bucket>[bucket1, bucket2, bucket2];
s1.add(5);
s2.add("bye");
s3.add(bucket3);
assert(s2.has("bye"));
assert(s2.has("hello"));
assert(s3.has(bucket2));

//Map tests
let m1 = MutMap<str>{"hello" => "world"};
let m2: MutMap<num> = MutMap<num>{"hello" => 123};
let m3 = MutMap<cloud.Bucket>{"b1" => bucket1, "b2" => bucket2};
let m4: MutMap<str> = m1;
let m5 = MutMap<str>{"goodbye" => "world"};
let m6 = MutMap<MutMap<str>>{"a" => m1, "b" => m5};
assert(m1.has("hello"));
assert(m2.size() == 1);
assert(m3.get("b1") == bucket1);
assert(m4.size() == 1);
assert(m6.get("a").get("hello") == "world");

// mutate maps
m1.set("hello", "goodbye");
m6.set("a", MutMap<str>{"foo" => "bar"});
m2.clear();

assert(m2.size() == 0);
assert(m1.get("hello") == "goodbye");
assert(m6.get("a").get("foo") == "bar");
