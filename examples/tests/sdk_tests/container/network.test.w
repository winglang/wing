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
  let networkHost = new sim.Container(
    name: "http-echo",
    image: "hashicorp/http-echo",
    containerPort: 5678,
    args: ["-text=bang"],
    network: "host",
  ) as "network-host";

  let localUrl = "http://localhost:{networkHost.hostPort!}";
  
  test "container with host network" {
    expect.equal(networkHost.hostPort, "5678");
    expect.equal(localUrl, "http://localhost:5678");
  }
}
