bring cloud;

let myStr = "hello, string";
let myNum = 1234;
let myBool = true;
let mySecondBool = false;
let myDur = 10m;

let handler = inflight (s: str): str => {
  log(myStr);

  let n = myNum;
  log("${n}");

  assert(mySecondBool == false);

  if myBool {
    log("bool=true");
  } else {
    log("bool=false");
  }

  let min = myDur.minutes;
  let sec = myDur.seconds;
  let hr  = myDur.hours;
  let split = "min=${min} sec=${sec} hr=${hr}".split(" ");
  assert(split.length == 3);
};

new cloud.Function(handler);

