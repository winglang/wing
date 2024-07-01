// used by bring_local_normalization.w

pub class Bar {
  pub static bar(): str {
    return "bar";
  }
  pub static getSubdir(): str {
    return @dirname;
  }
}

pub inflight class InflightBar {}