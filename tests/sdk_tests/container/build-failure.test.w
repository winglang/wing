/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring sim;

new sim.Container(
  name: "build-failure",
  image: "./build-failure",
);
