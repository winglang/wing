struct SomeStruct {
  b: num;
}

pub class FooB {
  pub static fromJson(jsonStr: str): SomeStruct {
    return SomeStruct.parseJson(jsonStr);
  }
}