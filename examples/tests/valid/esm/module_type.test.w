bring cloud;

class Extern {
  extern "./esm_extern.js"
  pub static inflight exampleInflight();
}

test "run extern" {
  Extern.exampleInflight();
}