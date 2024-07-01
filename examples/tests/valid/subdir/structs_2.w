pub struct MyStruct {
  val: str;
}

pub struct SomeStruct {
  foo: str;
}

pub class UsesStructInImportedFile {
  someStruct: SomeStruct;

  new() {
    this.someStruct = SomeStruct.fromJson({foo: "123"});
  }
}
