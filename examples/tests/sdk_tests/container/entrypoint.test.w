/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring sim;
bring http;
bring util;
bring expect;

// only relevant in simulator
if util.env("WING_TARGET") == "sim" {
  let entrypoint = new sim.Container(
    name: "my-entrypoint-app",
    image: "./my-docker-image",
    containerPort: 3000,
    args: ["-c", "RESPONSE=hello /usr/local/bin/node /app/index.js"],
    entrypoint: "/bin/sh",
  ) as "with-entrypoint";

  test "container with entrypoint" {
    let response = http.get("http://localhost:{entrypoint.hostPort!}");
    log(response.body);
    expect.equal("hello", response.body);
  }
}
