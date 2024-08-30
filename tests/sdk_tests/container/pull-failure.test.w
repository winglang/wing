/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring sim;
bring cloud;

let x = new sim.Container(
  name: "pull-failure",
  image: "foo://do-not-pull-me",
  containerPort: 1234,
);
