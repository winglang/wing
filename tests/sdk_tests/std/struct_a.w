struct SomeStruct {
  a: num;
}

pub class FooA {
  pub static fromJson(jsonStr: str): SomeStruct {
    return SomeStruct.parseJson(jsonStr);
  }
}