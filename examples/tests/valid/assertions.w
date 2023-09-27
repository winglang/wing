// used by:
// - api_cors_custom.test.w
// - api_cors_default.test.w
// - website_with_api.test.w

inflight class Assert {
  pub static equalStr(a: str, b: str): bool {
    try {
      assert(a == b);
    } catch e {
      throw("expected: ${b} got: ${a}");
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

  pub static assertThrows(expected: str, block: (): void) {
    let var error = false;
    try {
      block();
    } catch actual {
      assert(actual == expected);
      error = true;
    }
    assert(error);
  }
}