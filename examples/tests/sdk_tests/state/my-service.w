bring sim;
bring cloud;
bring util;

pub class MyService {
  pub state: sim.State;
  startTimeKey: str;
  pub startTime: str;
  
  init() {
    // use `sim.State` to store in-memory data
    this.state = new sim.State();

    this.startTimeKey = "start_time";

    new cloud.Service(inflight () => {
      // when the service is initialized, update the state
      this.state.set(this.startTimeKey, "2023-10-16T20:47:39.511Z");
    });

    // return a token to the user (something like "${root/env0/sim.State#attrs.foo}"). this token
    // gets resolved by the simulator.
    this.startTime = this.state.token(this.startTimeKey);
  }

  pub inflight getStartTime(): str {
    return this.state.get(this.startTimeKey).asStr();
  }
}
