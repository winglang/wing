// used by:
// - api_cors_custom.test.w
// - api_cors_default.test.w
// - website_with_api.test.w

inflight class Assert {
  pub static throws(expected: str, block: (): void): void {
    let var actual = "";
    try {
      block();
    } catch e {
      actual = e;
    }
    if (actual == "") {
      throw("expected error, but none thrown.");
    }
    if (actual != expected) {
      throw("expected error message: \"${expected}\" got: \"${actual}\"");
    }
  }

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

class PreflightAssert {
  pub static throws(expected: str, block: (): void): void {
    let var actual = "";
    try {
      block();
    } catch e {
      actual = e;
    }
    if (actual == "") {
      throw("expected error, but none thrown.");
    }
    if (actual != expected) {
      throw("expected error message: \"${expected}\" got: \"${actual}\"");
    }
  }
}
