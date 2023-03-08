resource Foo {
  mut_array: MutArray<str>;
  var reassignable: num;

  init() {
    this.mut_array = MutArray<str>[];
    this.mut_array.push("hello");
    this.reassignable = 42;
  }

  inflight test() {
    print("${this.reassignable}");
//                ^^^^^^^^^^^^ Unable to reference "this.reassignable" from inflight method "test" because it is reassignable ("var")
    print(this.mut_array.at(0));
//             ^^^^^^^^^ Unable to reference "this.mut_array" from inflight method "test" because type MutArray<str> is not capturable
  }
}
