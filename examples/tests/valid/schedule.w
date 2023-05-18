bring cloud;

class Schedule {  
  onTick(handler: inflight (): str) {
    new cloud.Function(inflight () => {
      handler();
    });
  }
}

let s = new Schedule();
s.onTick(inflight (): str => {
  return "foo";
});
