/*\
skipPlatforms:
  - win32
  - darwin
\*/
bring sim;
bring util;

// only relevant in simulator
if util.env("WING_TARGET") == "sim" {
  let container = new sim.Container(
    name: "postgres",
    image: "postgres:15",
    env: {
      POSTGRES_PASSWORD: "password"
    },
    containerPort: 5432,
    volumes: ["/var/lib/postgresql/data"],
  );

  test "my test" {
    log("dummy test");
  }
}
