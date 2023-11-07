pub class T {
  extern "./extern.js" pub static inflight error(): void;
  pub static inflight err() {
    T.error();
  }
}