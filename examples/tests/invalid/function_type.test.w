// function type with no return type
let my_func = (callback: (num)) => {  };
//                       ^^^^^ Expected function return type
let my_func2 = (callback: ((num)): (str)) => {  };
//                                 ^^^^^ Expected function return type
//                         ^^^^^ Expected function return type

// interface methods with no return type
interface IFace {
  my_method(x: num);
//^^^^^^^^^^^^^^^^^ Expected method return type
  inflight my_method2(x: num);
//         ^^^^^^^^^^^^^^^^^^ Expected method return type
}
