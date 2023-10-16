// this test will fail because no body is setting "my_unresolved_token" during deployment. 

bring sim;
bring cloud;
bring util;

let state = new sim.State();

let fn = new cloud.Function(
  inflight (): str => {
    return util.env("FOO_VALUE");
  },
  env: {
    FOO_VALUE: state.token("my_unresolved_token")
  }
);
