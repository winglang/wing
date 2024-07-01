// interface methods with no return type
interface IFace {
  my_method(x: num);
//^^^^^^^^^^^^^^^^^ Expected method return type
  inflight my_method2(x: num);
//         ^^^^^^^^^^^^^^^^^^ Expected method return type
}

let my_func3 = (a: num, b: str?, c: bool) => {};
//                      ^ Optional parameter before non-optional parameter
