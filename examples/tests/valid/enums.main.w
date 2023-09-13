enum SomeEnum {
    ONE, TWO, THREE
}

let one = SomeEnum.ONE;
let two: SomeEnum = SomeEnum.TWO; // Try with explicit type annotation

test "inflight" {
  assert(one == SomeEnum.ONE);
  assert(two == SomeEnum.TWO);
}