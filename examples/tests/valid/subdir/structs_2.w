pub struct MyStruct {
  val: str;
}

pub struct SomeStruct {
  foo: str;
}

pub class UsesStructInImportedFile {
  someStruct: SomeStruct;

  init() {
    this.someStruct = SomeStruct.fromJson({foo: "123"});
  }
}
