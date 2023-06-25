bring cloud;
//-----------------------------------------------------------------------------
// length

assert([1,2,3].length == 3);
assert(MutArray<num>[1,2,3].length == 3);

test "length" {
  assert(["hello"].length == 1);
  assert(MutArray<str>["hello"].length == 1);
}

//-----------------------------------------------------------------------------
// at()

assert(["hello"].at(0) == "hello");
assert(MutArray<str>["hello", "world"].at(1) == "world");

test "at()" {
  assert(["hello"].at(0) == "hello");
  assert(MutArray<str>["hello", "world"].at(1) == "world");
}

//-----------------------------------------------------------------------------
// push() & pop()

let a = MutArray<str>["hello"];
assert(a.length == 1);
a.push("world");
assert(a.length == 2);
assert(a.at(0) == "hello");
assert(a.at(1) == "world");
let item = a.pop();
assert(item == "world");
assert(a.length == 1);
assert(a.at(0) == "hello");

/*
// The below does not work, opened issue #3043
let bucket = new cloud.Bucket() as "myBucket";
let buckets = Array<cloud.Bucket>[bucket];

test "pushAndPopBuckets()" {
  assert(buckets.length == 1);
}
*/

test "pushAndPop()" {
  let a = MutArray<str>["hello"];
  assert(a.length == 1);
  a.push("world");
  assert(a.length == 2);
  assert(a.at(0) == "hello");
  assert(a.at(1) == "world");
  let item = a.pop();
  assert(item == "world");
  assert(a.length == 1);
  assert(a.at(0) == "hello");
}

//-----------------------------------------------------------------------------
// concat()
let array = Array<str>["hello"];
assert(array.length == 1);
let anotherArray = Array<str>["wing"];
assert(anotherArray.length == 1);
let mergedArray = array.concat(anotherArray);
assert(mergedArray.length == 2);
assert(mergedArray.at(0) == "hello");
assert(mergedArray.at(1) == "wing");

let b = MutArray<str>["hello"];
assert(b.length == 1);
let c = MutArray<str>["wing"];
assert(c.length == 1);
let d = b.concat(c);
assert(d.length == 2);
assert(d.at(0) == "hello");
assert(d.at(1) == "wing");

test "concatMutArray()" {
  let b = MutArray<str>["hello"];
  assert(b.length == 1);
  let c = MutArray<str>["wing"];
  assert(c.length == 1);
  let d = b.concat(c);
  assert(d.length == 2);
  assert(d.at(0) == "hello");
  assert(d.at(1) == "wing");
}

test "concatArray()" {
  let array = Array<str>["hello"];
  assert(array.length == 1);
  let anotherArray = Array<str>["wing"];
  assert(anotherArray.length == 1);
  let mergedArray = array.concat(anotherArray);
  assert(mergedArray.length == 2);
  assert(mergedArray.at(0) == "hello");
  assert(mergedArray.at(1) == "wing");
}

//-----------------------------------------------------------------------------
// contains()

let e = MutArray<str>["hello", "wing"];
let f = "wing";
let contains = e.contains(f);
assert(contains);
let n = "NotThere";
let doesNotContain = e.contains(n);
assert(!doesNotContain);

test "contains()" {
  let e = MutArray<str>["hello", "wing"];
  let f = "wing";
  let contains = e.contains(f);
  assert(contains);

  let g = "NotThere";
  let doesNotContain = e.contains(g);
  assert(!doesNotContain);
}

//-----------------------------------------------------------------------------
// indexOf()

let g = MutArray<str>["hello", "wing"];
let h = "wing";
let index = g.indexOf(h);
assert(index == 1);

let t = "notThere";
let secondIndex = g.indexOf(t);
assert(secondIndex == -1);

test "indexOf()" {
  let g = MutArray<str>["hello", "wing"];
  let h = "wing";
  let index = g.indexOf(h);
  assert(index == 1);

  let t = "notThere";
  let secondIndex = g.indexOf(t);
  assert(secondIndex == -1);
}

//-----------------------------------------------------------------------------
// join()

let i = MutArray<str>["hello", "wing"];
let j = "wing";
let delimeter = ";";
let joinedString = i.join(delimeter);
let expectedString = i.at(0) + delimeter + i.at(1);
assert(joinedString == expectedString);

let l = MutArray<str>["hello", "wing"];
let m = "wing";
let separator = ",";
let joinedStringWithDefault = i.join();
let expectedStringWithDefault = i.at(0) + separator + i.at(1);
assert(joinedStringWithDefault == expectedStringWithDefault);

test "join()" {
  let i = MutArray<str>["hello", "wing"];
  let j = "wing";
  let separator = ";";
  let joinedString = i.join(separator);
  let expectedString = i.at(0) + separator + i.at(1);
  assert(joinedString == expectedString);
}

test "joinWithDefaultSeparator()" {
  let i = MutArray<str>["hello", "wing"];
  let j = "wing";
  let separator = ",";
  let joinedString = i.join();
  let expectedString = i.at(0) + separator + i.at(1);
  assert(joinedString == expectedString);
}

//-----------------------------------------------------------------------------
// copy()

let o = MutArray<str>["hello", "wing"];
let p = o.copy();
assert(o.length == p.length);
assert(o.at(0) == p.at(0));

test "copy()" {
  let o = MutArray<str>["hello", "wing"];
  let p = o.copy();
  assert(o.length == p.length);
  assert(o.at(0) == p.at(0));
}

let q = Array<str>["hello", "wing"];
let r = q.copyMut();
assert(q.length == r.length);
assert(q.at(0) == r.at(0));

//-----------------------------------------------------------------------------
// copyMut()

test "copyMut()" {
  let q = Array<str>["hello", "wing"];
  let r = q.copyMut();
  assert(q.length == r.length);
  assert(q.at(0) == r.at(0));
}

//-----------------------------------------------------------------------------
// lastIndexOf()

let lastStr = "wing";
let s = MutArray<str>["hello", lastStr, lastStr];
let u = s.lastIndexOf(lastStr);
assert(u == 2);

let v = s.lastIndexOf("something");
assert(v == -1);

test "lastIndexOf()" {
  let lastStr = "wing";
  let s = MutArray<str>["hello", lastStr, lastStr];
  let u = s.lastIndexOf(lastStr);
  assert(u == 2);

  let v = s.lastIndexOf("something");
  assert(v == -1);
}
