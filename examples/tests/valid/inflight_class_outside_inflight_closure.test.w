bring cloud;

inflight class BinaryOperation {
  lhs: num;
  rhs: num;

  new(lhs: num, rhs: num) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  pub add(): num {
    return this.lhs + this.rhs;
  }
}

test "inflight class outside inflight closure" {
  let op = new BinaryOperation(10, 20);
  assert(op.add() == 30);
}