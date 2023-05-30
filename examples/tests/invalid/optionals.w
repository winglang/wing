let f = (x: num) => {
  // do something
};

let x: num? = 1;

f(x);
//^ error: x is num? but f expects num

let y = true;
if y? {
 // ^ y isn't optional
}

let z = y ?? 1;
//      ^ y isn't optional

let w: str = x ?? 3;
//  ^ trying to assign an unwrapped number to a string

x ?? "hello";
//  default type (str) must be same as wrapped type (num)

inflight class Super {
}
inflight class Sub1 extends Super {
}
inflight class Sub2 extends Super {
}

let optionalSub1: Sub1? = new Sub1();
optionalSub1 ?? new Sub2();
//               ^ error: Sub2 is not a subtype of Sub1
optionalSub1 ?? new Super();
//               ^ error: Super? is not a subtype of Sub1


if let x = true {
//         ^^^^ Expected type to be optional, but got "bool" instead
}

let var hi: str? = "hi";
if let hi = hi {
  // shadowed variable hi is not re-assignable, to reassign vars in if let 
  // requires using `if let var` statement 
  hi = "bye";
//^^^^^^^^^^^ Variable hi is not reassignable 
}

struct A {
  val: num?;
}

struct B {
  a: A?;
}

let a: A = A { val: 1 };
let b: B = B { a: a };

let c = b.a.val;
//      ^^^ Property access on optional type "A?" requires optional accessor: "?."
struct Foo {
  val: str?;
}

struct Bar {
  foo: Foo?;
}

struct Baz {
  bar: Bar?;
}

let baz: Baz = Baz {
  bar: Bar {
    foo: Foo {
      val: "hello"
    }
  }
};

// Ensure that ?. returns T? rather than T
let val: str = baz?.bar?.foo?.val;
//             ^^^^^^^^^^^^^^^^^^ Expected type to be "str", but got "str?" instead
