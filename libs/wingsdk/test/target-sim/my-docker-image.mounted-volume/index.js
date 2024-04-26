#!/usr/bin/env node
const http = require("http");
const fs = require("fs");

process.on("SIGINT", () => {
  console.info("Interrupted");
  process.exit(0);
});

const server = http.createServer((req, res) => {
  console.log(`request received: ${req.method} ${req.url}`);
  res.end(fs.readdirSync("/tmp").join("\n"));
});

if (!fs.existsSync("/tmp/hello.txt")) {
  // on the first run, create a file
  fs.writeFileSync("/tmp/hello.txt", "Hello, World!", "utf8");
} else {
  // on the second run, create a different file
  fs.writeFileSync("/tmp/world.txt", "Hello, World!", "utf8");
}

console.log("listening on port 3000");
server.listen(3000);
