// return type is required for function types
let my_func = (callback: (num): void) => {  };
let my_func2 = (callback: ((num): void): (str): void) => {  };

// return type is optional for closures
let my_func3 = (x: num) => {  };
let my_func4 = (x: num): void => {  };
let my_func5 = inflight (x: num) => {  };
let my_func6 = inflight (x: num): void => {  };

// variadic can appear after optional params
let my_func7 = inflight (x: num, y: bool?, ...z: Array<str>): void => {  };

// return type is optional for methods
class C {
  my_method(x: num) {  }
  my_method2(x: num): void {  }
  inflight my_method3(x: num) {  }
  inflight my_method4(x: num): void {  }
}

// return type is required for interface methods
interface IFace {
  my_method(x: num): void;
  inflight my_method2(x: num): void;
}
