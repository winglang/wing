bring cloud;

resource Test {
  my_str: str;
  my_num: num;
  my_arr: Array<str>;

  init() {
    this.my_str = "hello";
    this.my_num = 123;
    this.my_arr = ["bang", "bing"];
  }

  inflight test() {
    let y = this.my_num + 456;
    assert(y == 579);
    assert(this.my_str == "hello");
    assert(this.my_arr.at(1) == "bing");
    assert(this.my_arr.length == 2);
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";