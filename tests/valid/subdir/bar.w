// used by bring_local_normalization.w

pub class Bar {
  pub static bar(): str {
    return "bar";
  }
  pub static getSubdir(): str {
    return @dirname;
  }
  pub static getSubfile(): str {
    return @filename;
  }
}

pub inflight class InflightBar {}
