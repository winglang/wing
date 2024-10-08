// This file was auto generated from an example found in: 20-sleep.md_example_1
// Example metadata: {"valid":true}
bring util;
bring cloud;

// util.sleep has inflight api for sleep
inflight () => {
  util.sleep(40s);
};

// example showing cloud function that sleeps
let longTask = new cloud.Function(inflight () => {

  let timer1 = () => {
    log("Time 1 fired");
    util.sleep(5s);
  };

  let timer2 = () => {
    log("Time 2 fired");
    util.sleep(2s);
  };

  timer1();
  timer2();
});

