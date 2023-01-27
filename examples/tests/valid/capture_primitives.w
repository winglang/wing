bring cloud;

let my_str = "hello, string";
let my_num = 1234;
let my_bool = true;
let my_second_bool = false;
let my_dur = 10m;

let handler = inflight (s: str): str => {
  print(my_str);

  let n = my_num;
  print("${n}");

  assert(my_second_bool == false);

  if my_bool {
    print("bool=true");
  } else {
    print("bool=false");
  }

  let min = my_dur.minutes;
  let sec = my_dur.seconds;
  let hr  = my_dur.hours;
  let split = "min=${min} sec=${sec} hr=${hr}".split(" ");
  assert(split.length == 3);
};

new cloud.Function(handler);

