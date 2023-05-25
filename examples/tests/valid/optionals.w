let x: num? = 4;
assert(x? == true);
assert(!x? == false);
// TODO: add a `x? == false` case when we implement some way to null initialize an optional (https://github.com/winglang/wing/pull/1495)

assert(x ?? 5 == 4);
// TODO: add test for optional is nothing case (see https://github.com/winglang/wing/pull/1495)

let y: num = x ?? 5;
assert(y == 4);

inflight class Super {
  name: str;
  init() { this.name = "Super"; }
}
inflight class Sub extends Super {
  init() { this.name = "Sub"; }
}
inflight class Sub1 extends Super {
  init() { this.name = "Sub"; }
}

let optionalSup: Super? = new Super();
let s = optionalSup ?? new Sub();
assert(s.name == "Super");

struct Name {
  first: str;
  last: str?;
}

let var name: Name? = Name {
  first: "John",
  last: "Doe",
};

// simple tests
if let n = name {
  assert(n.first == "John");
}

name = nil;

if let n = name {
  assert(false); // should not be reached
} else {
  assert(true);
}

let tryParseName = (fullName: str): Name? => {
  let parts = fullName.split(" ");
  if parts.length < 1 {
    return nil;
  }
  return Name {
    first: parts.at(0),
    last: parts.at(1),
  };
};


// Nested if lets
if let parsedName = tryParseName("Good Name") {
  assert(parsedName.first == "Good");
  // check for optional last name
  if let lastName = parsedName.last {
    assert(lastName == "Name");
  } else {
    assert(false); // Something went wrong
  }
}

if let parsedName = tryParseName("BadName") {
  assert(parsedName.first == "BadName");
  if let lastName = parsedName.last {
    assert(false); // No last name should exist
  }
}

// check that falsey values are handled correctly
let falsy: bool? = false;
if let f = falsy {
  assert(f == false);
} else {
  assert(false);
}

// Shadow for days
let shadow: str? = "root";
if let shadow = shadow {
  assert(shadow == "root");
  let shadow1: str? = "nested";
  if let shadow1 = shadow1 {
    assert(shadow1 == "nested");
  } else {
    assert(false);
  }
}

// return out of if let
let fun = (a: str?): str => {
  if let y = a {
    return y;
  } else {
    return "default";
  }
};

assert(fun("hello") == "hello");
assert(fun(nil) == "default");

class Node {
  value: num;
  left: Node?;
  right: Node?;

  init(value: num, left: Node?, right: Node?) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// BST [8, 3, 10, 1, 6, 14, nil, 13]
let tree = new Node(
  8, 
  new Node(
    3,
    new Node(1, nil, nil) as "one",
    new Node(6, nil, nil) as "six",
  ) as "three",
  new Node(
    10,
    nil,
    new Node(
      14, 
      new Node(13, nil, nil) as "thirteen", 
      nil
    ) as "fourteen",
  ) as "ten",
) as "eight";

let thirteen = tree.right?.right?.left.value;
let notThere = tree.right?.right?.right;

assert(thirteen == 13);
assert(notThere == nil);