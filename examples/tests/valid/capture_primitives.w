bring cloud;

let my_str = "hello, string";
let my_num = 1234;
let my_bool = true;

let handler = inflight (s: str): str => {
  print(my_str);

  let n = my_num;
  print("${n}");

  if my_bool {
    print("bool=true");
  } else {
    print("bool=false");
  }
};

new cloud.Function(handler);

