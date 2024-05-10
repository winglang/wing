let my_func1 = (callback: inflight (num): num) => {  };
my_func1((n: num): num => { return n * 2; });

let my_func2 = (callback: (num): num) => {  };
my_func2(inflight (n: num): num => { return n * 2; });

interface IMyHandlerInterface1 {
  inflight handle(n:  num): num;
}

let my_func3 = (callback: IMyHandlerInterface1) => {  };
my_func3((n: num): num => { return n * 2; });

let my_func4 = (callback: (num): num) => {  };
my_func4(inflight (s: str): str => { return s.uppercase(); });

let accepts_callback = (callback: (inflight (str): str): void): void => {
  callback(inflight (msg: str): str => {
    return "Hi " + msg + "!";
  });
};

let callback = (inner_fn: ((str): str): void): void => {};

accepts_callback(callback); // error
