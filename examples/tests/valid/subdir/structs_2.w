struct MyStruct {
  val: str;
}

struct SomeStruct {
  foo: str;
}

class UsesStructInImportedFile {
  someStruct: SomeStruct;

  init() {
    this.someStruct = SomeStruct.fromJson({foo: "123"});
  }
}