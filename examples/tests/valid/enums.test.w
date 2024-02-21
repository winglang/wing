// enums can be referenced by other types before they are defined
struct A {
  e: SomeEnum;
}

// type annotations can reference enums before they are defined
let opt: SomeEnum? = nil;

// values can reference enums before they are defined
let three = SomeEnum.THREE;

enum SomeEnum {
    ONE, TWO, THREE
}

let one = SomeEnum.ONE;
let two: SomeEnum = SomeEnum.TWO; // Try with explicit type annotation

test "inflight" {
  assert(one == SomeEnum.ONE);
  assert(two == SomeEnum.TWO);
}
