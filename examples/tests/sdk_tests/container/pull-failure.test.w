bring sim;
bring cloud;

let x = new sim.Container(
  name: "pull-failure",
  image: "foo://do-not-pull-me",
  containerPort: 1234,
);

test "take a dependency on the container" {
  log(x.hostPort!);
}

