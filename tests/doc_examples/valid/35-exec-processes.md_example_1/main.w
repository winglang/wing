// This file was auto generated from an example found in: 35-exec-processes.md_example_1
// Example metadata: {"valid":true}
bring util;

let output = util.exec("echo", ["-n", "Hello, Wing!"]);

// exec with custom environment variables
let output2 = util.exec("bash", ["--norc", "--noprofile", "-c", "echo $WING_TARGET $ENV_VAR"], { env: { ENV_VAR: "Wing" } });

// exec with inherited environment variables
let output3 = util.exec("bash", ["--norc", "--noprofile", "-c", "echo $WING_TARGET $ENV_VAR"], { inheritEnv: true });

// exec with current working directory
let output4 = util.exec("bash", ["--norc", "--noprofile", "-c", "echo Hello"], { cwd: "/tmp" });

log(output);
log(output2);
log(output3);
log(output4);
