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

  let echo = new sim.Container(
    name: "http-echo",
    image: "hashicorp/http-echo",
    containerPort: 5678,
    args: ["-text=bang"],
  ) as "http-echo";
  
  let app = new sim.Container(
    name: "my-app",
    image: "./my-docker-image",
    containerPort: 3000,
  ) as "my-app";
  
  test "get echo" {
    let response = http.get("http://localhost:{echo.hostPort!}");
    log(response.body);
    expect.equal("bang\n", response.body);
  }
  
  test "get app" {
    let response = http.get("http://localhost:{app.hostPort!}");
    log(response.body);
    expect.equal("Hello, Wingnuts!", response.body);
  }
  
}
