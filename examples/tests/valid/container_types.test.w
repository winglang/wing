bring cloud;

let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

//Array tests
let emptyArray = Array<num>[];
assert(emptyArray.length == 0);
let emptyArray2 = MutArray<num>[];
assert(emptyArray2.length == 0);
let arr1 = [1, 2, 3];
assert(arr1.length == 3);
assert(arr1.at(1) == 2);
let arr2: Array<str> = ["1", "2", "3"];
assert(arr2.length == 3);
assert(arr2.at(1) == "2");
let arr3 = Array<num>[1, 2, 3];
assert(arr3.length == 3);
assert(arr3.at(1) == 2);
let arr4: Array<num> = Array<num>[1, 2, 3];
assert(arr4.length == 3);
assert(arr4.at(1) == 2);
let arr5 = [bucket1, bucket2, bucket3];
assert(arr5.length == 3);
assert(arr5.at(1) == bucket2);
let arr6: Array<cloud.Bucket> = [bucket1, bucket2, bucket3];
assert(arr6.length == 3);
assert(arr6.at(1) == bucket2);
let arr7: Array<num> = arr4;
assert(arr7.length == 3);
assert(arr7.at(1) == 2);

if let val = emptyArray.tryAt(0) {
  assert(false); // Should not happen
}

if let val = arr1.tryAt(0) {
  assert(val == 1);
} else {
  assert(false); // Should not happen
}

//Map tests
let emptyMap = Map<num>{};
assert(emptyMap.size() == 0);
let emptyMap2 = MutMap<num>{};
assert(emptyMap2.size() == 0);
let m1 = {"a" => 1, "b" => 2, "c" => 3};
assert(m1.size() == 3);
assert(m1.get("b") == 2);
let m2: Map<num> = {"a" => 1, "b" => 2, "c" => 3};
assert(m2.size() == 3);
assert(m2.get("b") == 2);
let m3 = Map<num> {"a" => 1, "b" => 2, "c" => 3};
assert(m3.size() == 3);
assert(m3.get("b") == 2);
let m4: Map<num> = Map<num> {"a" => 1, "b" => 2, "c" => 3};
assert(m4.size() == 3);
assert(m4.get("b") == 2);
let m5 = {"a" => bucket1, "b" => bucket2, "c" => bucket3};
assert(m5.size() == 3);
assert(m5.get("b") == bucket2);
let m6: Map<cloud.Bucket> = {"a" => bucket1, "b" => bucket2, "c" => bucket3};
assert(m6.size() == 3);
assert(m6.get("b") == bucket2);
let m7: Map<num> = m1;
assert(m7.size() == 3);
assert(m7.get("b") == 2);
assert(m7.has("b"));
assert(m4.has("boom") == false);
let m8 = {"a" => "a1", "b" => "b1", "c" => "c1"};
assert(m8.keys().at(0) == "a");
assert(m8.keys().at(1) == "b");
assert(m8.keys().at(2) == "c");
assert(m8.values().at(0) == "a1");
assert(m8.values().at(1) == "b1");
assert(m8.values().at(2) == "c1");
for val in m8.keys() {
  assert(!val.endsWith("1"));
}
for val in m8.values() {
  assert(val.endsWith("1"));
}
let m9 = MutMap<str>{"a" => "a1", "b" => "b1", "c" => "c1"};
assert(m9.keys().at(0) == "a");
assert(m9.keys().at(1) == "b");
assert(m9.keys().at(2) == "c");
assert(m9.values().at(0) == "a1");
assert(m9.values().at(1) == "b1");
assert(m9.values().at(2) == "c1");
for val in m9.keys() {

  assert(!val.endsWith("1"));
}
for val in m9.values() {
  assert(val.endsWith("1"));
}

// try get something exists
if let k = m9.tryGet("a") {
  assert(k == "a1");
} else {
  assert(false); // should never happen
}

// try get something doesnt exist
if let k = m9.tryGet("def-fake") {
  assert(false); // should never happen
}

// get something that doesnt exist
try {
  m9.get("def-fake");
} catch err {
  assert(err.contains("does not contain key: \"def-fake\""));
}

// Map literal initialization with key expressions
let num9 = 9;
let m10 = {
  // Just a string
  "a" => 1,
  // Same string again (should overwrite)
  "a" => 2,
  // Interpolation
  "{num9+1}" => 9,
  // Same interpolation again (should overwrite)
  "{num9+1}" => 10,
  // Complex expression
  () => { return "{num9}9";}() => 99,
};
assert(m10.size() == 3);
assert(m10.get("a") == 2);
assert(m10.get("10") == 10);
assert(m10.get("99") == 99);

//Set tests
let emptySet = Set<num>[];
assert(emptySet.size == 0);
let emptySet2 = MutSet<num>[];
assert(emptySet2.size == 0);
let s2: Set<num> = Set<num>[1, 2, 3];
assert(s2.size == 3);
assert(s2.has(1));
let s3 = Set<num>[1, 2, 3];
assert(s3.size == 3);
assert(s3.has(1));
let s4: Set<num> = Set<num>[1, 2, 3];
assert(s4.size == 3);
assert(s4.has(1));
let s6: Set<cloud.Bucket> = Set<cloud.Bucket>[bucket1, bucket2, bucket3];
assert(s6.size == 3);
assert(s6.has(bucket2));
let s7: Set<num> = s2;
assert(s7.size == 3);
assert(s7.has(1));
