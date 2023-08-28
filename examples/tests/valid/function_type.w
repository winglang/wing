// return type is required for function types
let my_func = fn(callback: fn(num) -> void) {  };
let my_func2 = fn(callback: fn(fn(num) -> void) -> fn(str) -> void) {  };

// return type is optional for closures
let my_func3 = fn(x: num) {  };
let my_func4 = fn(x: num) -> void {  };
let my_func5 = inflight fn(x: num) {  };
let my_func6 = inflight fn(x: num) -> void {  };

// return type is optional for methods that return void
class C {
  my_method(x: num) {  }
  my_method2(x: num) -> void {  }
  inflight my_method3(x: num) {  }
  inflight my_method4(x: num) -> void {  }
}

// return type is required for interface methods
interface IFace {
  my_method(x: num) -> void;
  inflight my_method2(x: num) -> void;
}
