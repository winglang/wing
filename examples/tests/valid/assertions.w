inflight class Assert {
  public static equalStr(a: str, b: str): bool {
    try {
      assert(a == b);
    } catch e {
      throw("expected: ${b} got: ${a}");
    }
  }

  public static isNil(a: str?): bool {
    try {
      assert(a == nil);
    } catch e {
      log(e);
      throw("expected '${a}' to be nil");
    }
  }

  public static equalNum(a: num, b: num): bool{
    try {
      assert(a == b);
    } catch e {
      log(e);
      throw("expected: ${b} got: ${a}");
    }
  }
}