pub class Util {
  extern "../util.js" pub static inflight makeKeyInflight(name: str): str;

  pub static inflight double(msg: str): str {
    return "{msg}{msg}";
  }
}
