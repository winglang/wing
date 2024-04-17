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

console.log("listening on port 3000");
server.listen(3000);
