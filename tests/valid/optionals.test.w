let x: num? = 4;
assert(x? == true);
assert(!x? == false);
// TODO: add a `x? == false` case when we implement some way to null initialize an optional (https://github.com/winglang/wing/pull/1495)

assert(x ?? 5 == 4);
// TODO: add test for optional is nothing case (see https://github.com/winglang/wing/pull/1495)

let y: num = x ?? 5;
assert(y == 4);

class Super {
  pub name: str;
  new() { this.name = "Super"; }
}
class Sub extends Super {
  new() { this.name = "Sub"; }
}
class SubSub extends Sub {
  new() { this.name = "SubSub"; }
}

let optionalSup: Super? = new Super();
let s = optionalSup ?? new Sub();
assert(s.name == "Super");
let s2 = optionalSup ?? optionalSup ?? new SubSub();

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
    first: parts.tryAt(0)??"",
    last: parts.tryAt(1)??"",
  };
};

let json_obj = Json { ghost: "spooky" };
let var something_else = false;
if let y = json_obj.tryAsBool() {
  assert(y == true || y == false);
} elif let y = json_obj.tryAsNum() {
  assert(y + 0 == y);
} elif let y = json_obj.tryAsStr() {
  assert(y.length >= 0);
} else {
  something_else = true;
}
assert(something_else);

// if lets reassignable
let a: num? = 1;
if let var z = a {
  assert(z == 1);
  z = 2;
  assert(z == 2);
}

// extra space between if and let
let b: num? = 1;
if    let z = b {
  assert(z == 1);
}

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
  if parsedName.last != "" {
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
  pub value: num;
  pub left: Node?;
  pub right: Node?;

  new(value: num, left: Node?, right: Node?) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

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

let thirteen = tree.right?.right?.left?.value;
let notThere = tree.right?.right?.right;

assert(thirteen == 13);
assert(notThere == nil);

if let o = tree.left?.left {
  assert(o.value == 1);
}


// Check that we can lift optionals
bring cloud;

struct Payload {
    a: str;
    b: Map<str>?;
    c: cloud.Bucket?;
}

let payloadWithoutOptions = Payload {a: "a"};
let payloadWithBucket = Payload {a: "a", c: new cloud.Bucket() as "orange bucket"};

test "t" {
  assert(payloadWithoutOptions.b? == false);

  if (payloadWithBucket.c?) {
    payloadWithBucket.c?.put("x.txt", "something");
  }
}

let str1: str? = nil;
let str2: str? = nil;

if let s1 = str1 {
  assert(false); // Should not happen
} elif let s2 = str2 {
  assert(true);
}

// Optional function return type
let var fn: (): ((): num)? = () => { return () => { return 1337; }; };
if let f = fn() {
  assert(f() == 1337);
} else {
  assert(false);
}
fn = () => { return nil; };
if let f = fn() {
  assert(false);
} else {
  assert(true);
}

let maybeVar: num? = 123;
assert(maybeVar! == 123);

let maybeVarNull: str? = nil;
try {
  let err = maybeVarNull!;
  assert(false);
} catch e {
  assert(e == "Unexpected nil");
}

let maybeFn = (b: bool): Array<str>? => {
  if b {
    return ["hi"];
  }
};
try {
  maybeFn(false)!;
  assert(false);
} catch e {
  assert(e == "Unexpected nil");
}
assert(maybeFn(true)! == ["hi"]);

let maybeVarBool: bool? = true;
assert(!maybeVarBool! == false);

struct Person {
  name: str;
  age: num;
}
let person = Person.tryParseJson(Json.stringify({"name": "john", "age": 30}))!;
assert(person.name == "john" && person.age == 30);

let maybeX: num? = 0;
assert(maybeX! == 0);

let maybeY: str? = "";
assert(maybeY! == "");
