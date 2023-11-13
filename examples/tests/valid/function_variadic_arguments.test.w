bring cloud;
let bucket1 = new cloud.Bucket() as "bucket1";
let bucket2 = new cloud.Bucket() as "bucket2";
let bucket3 = new cloud.Bucket() as "bucket3";

// can use variadic methods from the jsii world
bucket3.node.addDependency(bucket1, bucket2);

let funcBucket = (...buckets: Array<cloud.Bucket>) => {
  assert(buckets.length == 2);
};
funcBucket(bucket1, bucket2);

let func1 = (var x: num, y: str?, var ...args: MutArray<num>) => {
  assert(x == 1);
  assert(y == "something" || y == nil);
  assert(args.length == 4);
  for i in args {
    assert(i > 0 && i < 5);
  }
  args.push(10);
  assert(args.at(4) == 10);
};
func1(1, "something", 1, 2, 3, 4);
func1(1, nil, 1, 2, 3, 4);

let addNums = (...nums: MutArray<num>):num => {
  let var total = 0;
  for n in nums {
    total = total + n;
  }
  return total;
};
assert(addNums(1, 2, 3) == 6);
assert(addNums() == 0);

let arityFunc = (n: num, b: bool, ...events: Array<Json>) => {
  assert(events.at(-1) == "d");
};

arityFunc(1, true, "a", "b", "c", "d"); // variadic args should be considered correctly in the arity check

class A {
  pub message: str;

  new(msg: str) {
    this.message = msg;
  }
}

class B extends A {
  new(msg: str) {
    this.message = msg;
  }
}

let subTypeFunc = (...events: Array<A>) => {
  assert(events.at(0).message == "this is A");
  assert(events.at(1).message == "this is B");
};

subTypeFunc(new A("this is A"), new B("this is B")); // variadic args should allow sub types

let jsonCastingFunc = (...events: Array<Json>) => {
  assert(events.at(0) == "str");
  assert(events.at(1) == "json str");
};

let jsonStr = Json "json str";

jsonCastingFunc("str", jsonStr); // variadic args should consider implicit json casting
