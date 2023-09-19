inflight class Assert {
  pub static equalStr(a: str, b: str): bool {
    try {
      assert(a == b);
    } catch e {
      throw("expected: ${b} got: ${a}");
    }
  }

  pub static isNil(a: str?): bool {
    try {
      assert(a == nil);
    } catch e {
      log(e);
      throw("expected '${a}' to be nil");
    }
  }

  pub static equalNum(a: num, b: num): bool{
    try {
      assert(a == b);
    } catch e {
      log(e);
      throw("expected: ${b} got: ${a}");
    }
  }
}