bring cloud;
//-----------------------------------------------------------------------------
// length

// Bucket can be tested only in preflight mode

let bucket = new cloud.Bucket() as "myBucket";
let buckets = Array<cloud.Bucket>[bucket];
let anotherBucket = new cloud.Bucket() as "mySecondBucket";
let anotherBuckets = Array<cloud.Bucket>[anotherBucket];

assert(buckets.length == 1);

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

assert(nodeof(buckets.at(0)).id == "myBucket");

test "at()" {
  assert(["hello"].at(0) == "hello");
  assert(MutArray<str>["hello", "world"].at(1) == "world");

  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };
  let INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    ["hello"].at(-1);
  });

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    ["hello"].at(20);
  });

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    MutArray<str>["hello"].at(20);
  });

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    MutArray<str>["hello"].at(-1);
  });
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
let pushMultipleItems: MutArray<str> = MutArray<str> ["element1"];
pushMultipleItems.push("element2", "element3");
assert(pushMultipleItems.length == 3);
assert(pushMultipleItems.at(0) == "element1");
assert(pushMultipleItems.at(1) == "element2");
assert(pushMultipleItems.at(2) == "element3");

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
  let pushMultipleItems: MutArray<str> = MutArray<str> ["element1"];
  pushMultipleItems.push("element2", "element3");
  assert(pushMultipleItems.length == 3);
  assert(pushMultipleItems.at(0) == "element1");
  assert(pushMultipleItems.at(1) == "element2");
  assert(pushMultipleItems.at(2) == "element3");
}

//-----------------------------------------------------------------------------
// popAt()

test "popAt()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };

  let INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
  let mutArr = MutArray<str>["hello", "world"];

  let item = mutArr.popAt(0);

  assert(item == "hello");
  assert(mutArr.length == 1);
  assert(mutArr.at(0) == "world");

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.popAt(-3);
  });

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.popAt(3);
  });
}

//-----------------------------------------------------------------------------
// concat()
let array = Array<str>["hello"];
assert(array.length == 1);
let mergedArray = array.concat(Array<str>["wing"]);
assert(mergedArray.length == 2);
assert(mergedArray.at(0) == "hello");
assert(mergedArray.at(1) == "wing");

let b = MutArray<str>["hello"];
assert(b.length == 1);
let d = b.concat(MutArray<str>["wing"]);
assert(d.length == 2);
assert(d.at(0) == "hello");
assert(d.at(1) == "wing");

let mergedBuckets = buckets.concat(anotherBuckets);
assert(mergedBuckets.length == 2);
assert(nodeof(mergedBuckets.at(0)).id == "myBucket");
assert(nodeof(mergedBuckets.at(1)).id == "mySecondBucket");

test "concatMutArray()" {
  let b = MutArray<str>["hello"];
  assert(b.length == 1);
  let d = b.concat(MutArray<str>["wing"]);
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
assert(e.contains("wing"));
assert(!e.contains("NotThere"));

assert(buckets.contains(buckets.at(0)));
let dummyBucket = new cloud.Bucket();
assert(!buckets.contains(dummyBucket));

let h = Array<str>["hello", "wing"];
assert(h.contains("wing"));
assert(!h.contains("NotThere"));

test "contains()" {
  let e = MutArray<str>["hello", "wing"];
  assert(e.contains("wing"));
  assert(!e.contains("NotThere"));

  let h = Array<str>["hello", "wing"];
  assert(h.contains("wing"));
  assert(!h.contains("NotThere"));
}

//-----------------------------------------------------------------------------
// indexOf()

let g = MutArray<str>["hello", "wing"];
assert(g.indexOf("wing") == 1);
assert(g.indexOf("notThere") == -1);
assert(buckets.indexOf(bucket) == 0);
assert(buckets.indexOf(dummyBucket) == -1);

test "indexOf()" {
  let g = MutArray<str>["hello", "wing"];
  assert(g.indexOf("wing") == 1);
  assert(g.indexOf("notThere") == -1);
}

let q = MutArray<str>["hello", "wing"];
assert(q.indexOf("wing") == 1);
assert(q.indexOf("notThere") == -1);


test "indexOfArray()" {
  let g = Array<str>["hello", "wing"];
  assert(g.indexOf("wing") == 1);
  assert(g.indexOf("notThere") == -1);
}

//-----------------------------------------------------------------------------
// join()

let m = MutArray<str>["hello", "wing"];
let delimeter = ";";
let joinedString = m.join(delimeter);
let expectedString = m.at(0) + delimeter + m.at(1);
assert(joinedString == expectedString);

let l = MutArray<str>["hello", "wing"];
let separator = ",";
let joinedStringWithDefault = m.join();
let expectedStringWithDefault = m.at(0) + separator + m.at(1);
assert(joinedStringWithDefault == expectedStringWithDefault);

test "join()" {
  let i = MutArray<str>["hello", "wing"];
  let separator = ";";
  let joinedString = i.join(separator);
  let expectedString = i.at(0) + separator + i.at(1);
  assert(joinedString == expectedString);
}

test "joinWithDefaultSeparator()" {
  let i = MutArray<str>["hello", "wing"];
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

let copiedBuckets = buckets.copyMut();
assert(copiedBuckets.length == 1);
assert(nodeof(copiedBuckets.at(0)).id == "myBucket");

test "copy()" {
  let o = MutArray<str>["hello", "wing"];
  let p = o.copy();
  assert(o.length == p.length);
  assert(o.at(0) == p.at(0));
}

let v = Array<str>["hello", "wing"];
let r = v.copyMut();
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
assert(s.lastIndexOf(lastStr) == 2);

assert(s.lastIndexOf("something") == -1);

let multipleBuckets = MutArray<cloud.Bucket>[bucket, bucket, anotherBucket];
assert(multipleBuckets.lastIndexOf(bucket) == 1);
assert(multipleBuckets.lastIndexOf(dummyBucket) == -1);

test "lastIndexOf()" {
  let lastStr = "wing";
  let s = MutArray<str>["hello", lastStr, lastStr];
  assert(s.lastIndexOf(lastStr) == 2);

  assert(s.lastIndexOf("something") == -1);
}

//-----------------------------------------------------------------------------
// set()

test "set()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };

  let INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
  let mutArr = MutArray<num>[1, 3, 5, 7, 9];

  assert(mutArr.at(0) == 1);
  mutArr.set(0, 2);
  assert(mutArr.at(0) == 2);

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.set(-1, 1);
  });
  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.set(5, 11);
  });
}

//-----------------------------------------------------------------------------
// insert()

test "insert()" {
  let assertThrows = (expected: str, block: (): void) => {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  };

  let INDEX_OUT_OF_BOUNDS_ERROR = "Index out of bounds";
  let mutArr = MutArray<num>[5, 10, 20];

  mutArr.insert(2, 15);

  assert(mutArr.length == 4);
  assert(mutArr.at(2) == 15);
  assert(mutArr.at(3) == 20);

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.insert(-3, 15);
  });

  assert(mutArr.length == 4);

  assertThrows(INDEX_OUT_OF_BOUNDS_ERROR, () => {
    mutArr.insert(7, 15);
  });

  assert(mutArr.length == 4);

  mutArr.insert(4, 25);

  assert(mutArr.length == 5);
  assert(mutArr.at(4) == 25);
}

//-----------------------------------------------------------------------------
// removeFirst()

test "removeFirst()" {
  let mutArr = MutArray<num>[3, 6, 9, 3];

  let r1 = mutArr.removeFirst(3);

  assert(r1 == true);
  assert(mutArr.length == 3);
  assert(mutArr == MutArray<num> [6, 9, 3]);

  let r2 = mutArr.removeFirst(-42);

  assert(r2 == false);
  assert(mutArr.length == 3);
}

//-----------------------------------------------------------------------------
// slice()

test "slice()" {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let slice1 = arr.slice(2, 5);
  assert(slice1 == [3, 4, 5]);

  let slice2 = arr.slice(5);
  assert(slice2 == [6, 7, 8, 9, 10]);

  let slice3 = arr.slice(0, 3);
  assert(slice3 == [1, 2, 3]);

  let slice4 = arr.slice(0);
  assert(slice4 == arr);

  let slice5 = arr.slice(0, 0);
  assert(slice5 == []);

  let mutarr = MutArray<num>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let mutSlice1 = mutarr.slice(2, 5);
  assert(mutSlice1 == MutArray<num>[3, 4, 5]);

  let mutSlice2 = mutarr.slice(5);
  assert(mutSlice2 == MutArray<num>[6, 7, 8, 9, 10]);

  let mutSlice3 = mutarr.slice(0, 3);
  assert(mutSlice3 == MutArray<num>[1, 2, 3]);

  let mutSlice4 = mutarr.slice(0);
  assert(mutSlice4 == mutarr);

  let mutSlice5 = mutarr.slice(0, 0);
  assert(mutSlice5 == MutArray<num>[]);
}
