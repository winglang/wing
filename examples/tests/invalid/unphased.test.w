unphased class UnphasedClass {}
// ^ Error: Unphased classes are not yet supported

unphased interface UnphasedInterface {}
// ^ Error: Unphased interfaces are not yet supported

let unphasedFn = unphased () => {
  // ^ Error: Unphased functions are not yet supported
  log("Hello, world!");
};

let fnWithUnphasedParamType = (f: unphased (str): num) => {
  // ^ Error: Unphased functions are not yet supported
};

let fnWithUnphasedReturnType = (): (unphased (str): num)? => {
  // ^ Error: Unphased functions are not yet supported
  return nil;
};

class Foo {
  unphased myField: str;
  // ^ Error: Class fields cannot be unphased
  unphased new() {}
  // ^ Error: Class constructors cannot be unphased
  unphased myMethod() {}
  // ^ Error: Unphased functions are not yet supported
}

interface IFoo {
  unphased bar(): void;
  // ^ Error: Unphased methods on interfaces are not yet supported
}
