// this test will fail because nobody is setting "my_unresolved_token" during deployment. 

bring sim;
bring cloud;
bring util;

let state = new sim.State();

let fn = new cloud.Function(
  inflight (): Json => {
    return util.env("FOO_VALUE");
  },
  env: {
    FOO_VALUE: state.token("my_unresolved_token")
  }
);

test "" {
  fn.invoke();
}
