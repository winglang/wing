bring sim;

enum MyEnum {
  A,
  B,
  C
}

struct MyStruct {
  a: num;
  b: str;
}

inflight class ResourceBackend impl sim.IResource {
  pub onStop() {}

  pub emptyMethod() {}
  pub methodWithNums(a: num, b: num): num { return 0; }
  pub methodWithStrs(a: str, b: str): str { return ""; }
  pub methodWithBools(a: bool, b: bool): bool { return false;}
  pub methodWithOptionals(a: num?, b: str?): bool? {}
  pub methodWithJsons(a: Json, b: Json): Json { return {}; }
  pub methodWithEnums(a: MyEnum, b: MyEnum): MyEnum { return MyEnum.A; }
  pub methodWithArrays(a: Array<str>, b: Array<num>): Array<bool> { return []; }
  pub methodWithMaps(a: Map<num>, b: Map<str>): Map<bool> { return {}; }
  pub methodWithStructs(a: MyStruct, b: MyStruct): MyStruct { return MyStruct{a: 0, b: ""}; }
  pub methodWithVariadics(a: str, ...b: Array<num>) {}
  pub methodWithComplexTypes(a: Array<Map<str?>>): Map<Array<Json>> { return {}; }
}
