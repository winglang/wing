bring cloud;

let myConst = "bang bang";

inflight class Bar {
  x: str;

  init() {
    this.x = "bar";
  }

  fromBar(): str {
    return this.x;
  }
}

inflight class Foo extends Bar {
  stringField: str;
  var numField: num;

  init(s: str) {
    this.stringField = s;
    this.numField = 123;
  }

  getStr(): str {
    return this.stringField;
  }

  numPlus(x: num): num {
    return this.numField + x;
  }

  returnCaptured(): str {
    return myConst;
  }
}

test "instantiate inflight class" {
  new Foo("bang");
}

test "call methods" {
  let foo = new Foo("hello1234");
  assert(foo.getStr() == "hello1234");
  assert(foo.numPlus(1000) == 1123);
}

test "call base methods" {
  let foo = new Foo("dang");
  assert(foo.fromBar() == "bar");
}

test "capture" {
  let foo = new Foo("hi");
  assert(foo.returnCaptured() == "bang bang");
}