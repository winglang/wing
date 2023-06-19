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
a.pop();
assert(a.length == 1);
assert(a.at(0) == "hello");

test "pushAndPop()" {
  let a = MutArray<str>["hello"];
  assert(a.length == 1);
  a.push("world");
  assert(a.length == 2);
  assert(a.at(0) == "hello");
  assert(a.at(1) == "world");
  a.pop();
  assert(a.length == 1);
  assert(a.at(0) == "hello");
}

//-----------------------------------------------------------------------------
// concat()

let b = MutArray<str>["hello"];
assert(b.length == 1);
let c = MutArray<str>["wing"];
assert(c.length == 1);
let d = b.concat(c);
assert(d.length == 2);
assert(d.at(0) == "hello");
assert(d.at(1) == "wing");

test "concat()" {
  let b = MutArray<str>["hello"];
  assert(b.length == 1);
  let c = MutArray<str>["wing"];
  assert(c.length == 1);
  let d = b.concat(c);
  assert(d.length == 2);
  assert(d.at(0) == "hello");
  assert(d.at(1) == "wing");
}

//-----------------------------------------------------------------------------
// contains()

let e = MutArray<str>["hello", "wing"];
let f = "wing";
let contains = e.contains(f);
assert(contains);

test "contains()" {
  let e = MutArray<str>["hello", "wing"];
  let f = "wing";
  let contains = e.contains(f);
  assert(contains);
}

//-----------------------------------------------------------------------------
// indexOf()

let g = MutArray<str>["hello", "wing"];
let h = "wing";
let index = g.indexOf(h);
assert(index == 1);

test "indexOf()" {
  let g = MutArray<str>["hello", "wing"];
  let h = "wing";
  let index = g.indexOf(h);
  assert(index == 1);
}

//-----------------------------------------------------------------------------
// join()

let i = MutArray<str>["hello", "wing"];
let j = "wing";
let delimeter = ";";
let joinedString = i.join(delimeter);
let expectedString = i.at(0) + delimeter + i.at(1);
assert(joinedString == expectedString);

test "join()" {
  let i = MutArray<str>["hello", "wing"];
  let j = "wing";
  let delimeter = ";";
  let joinedString = i.join(delimeter);
  let expectedString = i.at(0) + delimeter + i.at(1);
  assert(joinedString == expectedString);
}

//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2953
// 
// The bellow is not implemented:
// copy()
// copyMut()
// lastIndexOf()
