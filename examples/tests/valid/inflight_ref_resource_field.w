bring cloud;

resource Test {
  my_field: str;
  
  init () {
    this.my_field = "hello";
  }

  inflight test(): str {
    assert(this.my_field == "hello");
  }
}

let f = new Test();
new cloud.Function(inflight () => { f.test(); }) as "test";