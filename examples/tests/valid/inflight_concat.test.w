bring cloud;

class R {
  s1: str;
  new() {
    this.s1 = "hello";
  }
  inflight foo() {
    log(this.s1.concat(" world"));
  }
}

let r = new R();
