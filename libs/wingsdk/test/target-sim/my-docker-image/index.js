#!/usr/bin/env node
const http = require('http');

process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
});

const server = http.createServer((req, res) => {
  console.log(`request received: ${req.method} ${req.url}`);
  res.end('Hello, Wingnuts!');
});

console.log('listening on port 3000');
server.listen(3000);