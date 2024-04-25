/*\
skipPlatforms:
  - win32
  - darwin
\*/
bring sim;
bring util;

// This test was added to check that "wing test" still works when sim.Container is mounted to the state directory

// only relevant in simulator
if util.env("WING_TARGET") == "sim" {
  let container = new sim.Container(
    name: "postgres",
    image: "postgres:15",
    env: {
      POSTGRES_PASSWORD: "password"
    },
    containerPort: 5432,
    volumes: ["$WING_STATE_DIR:/var/lib/postgresql/data"],
  );

  test "my test" {
    log("dummy test");
  }
}
